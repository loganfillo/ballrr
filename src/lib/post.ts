import { CREATE_POST, CREATE_POST_MEDIA, CREATE_THUMBNAIL_MEDIA } from './queries';
import { uploadMediaToS3 } from './media';
import { Alert } from 'react-native';
import { Media, MediaType, UploadedMedia, User } from './types';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

/**
 * Creates a post. Uploads media file to s3 then creates the media and post entries
 * in the database. Alerts of success or failiure if something happened
 *
 * @param user The user which uploaded the post
 * @param apolloClient GraphQL client
 * @param media The media to post
 * @param caption The post's caption
 */
export async function createPost(
    user: User,
    apolloClient: ApolloClient<NormalizedCacheObject>,
    media: Media,
    thumbnail: Media,
    caption: string,
): Promise<void> {
    const uploadedMedia: UploadedMedia = await uploadMediaToS3(media);
    const uploadedThumbnail: UploadedMedia = await uploadMediaToS3(thumbnail);
    if (
        uploadedMedia.ok &&
        uploadedMedia.name !== undefined &&
        uploadedMedia.type !== undefined &&
        uploadedThumbnail.ok &&
        uploadedThumbnail.name !== undefined &&
        uploadedThumbnail.type !== undefined
    ) {
        try {
            const postId = await createPostEntry(apolloClient, user.id, caption);
            await createPostMediaEntry(
                apolloClient,
                uploadedMedia.name,
                uploadedMedia.type,
                postId,
            );
            await createThumbnailMediaEntry(apolloClient, uploadedThumbnail.name, postId);
            Alert.alert('Post Uploaded!');
        } catch (e) {
            Alert.alert('Could Not Upload Post to DB');
        }
    } else {
        Alert.alert('Could Not Upload Post to S3');
    }
}

/**
 * Creates the post in the databse

 * @param apolloClient GraphQL client
 * @param userId The posting user's ID
 * @param caption The post's caption
 * @returns
 */
async function createPostEntry(
    apolloClient: ApolloClient<NormalizedCacheObject>,
    userId: number,
    caption: string,
): Promise<number> {
    const res = await apolloClient.mutate({
        mutation: CREATE_POST,
        variables: { user_id: userId, caption },
    });

    return res.data.insert_posts_one.id;
}

/**
 * Creates the media in the database
 *
 * @param apolloClient GraphQL CLient
 * @param s3Key S3 key of the media
 * @param type Type of the media
 * @returns Post media id of created row
 */
export async function createPostMediaEntry(
    apolloClient: ApolloClient<NormalizedCacheObject>,
    s3Key: string,
    type: MediaType,
    postID: number,
): Promise<number> {
    const res = await apolloClient.mutate({
        mutation: CREATE_POST_MEDIA,
        variables: { s3_key: s3Key, type, post_id: postID },
    });
    return res.data.insert_post_media_one.id;
}

/**
 * Creates the thumbnail in the database
 *
 * @param apolloClient GraphQL CLient
 * @param s3Key S3 key of the thumbnail
 * @param type Type of the media
 * @returns Thumbnail media id of created row
 */
export async function createThumbnailMediaEntry(
    apolloClient: ApolloClient<NormalizedCacheObject>,
    s3Key: string,
    postID: number,
): Promise<number> {
    const res = await apolloClient.mutate({
        mutation: CREATE_THUMBNAIL_MEDIA,
        variables: { s3_key: s3Key, post_id: postID },
    });
    return res.data.insert_thumbnail_media_one.id;
}
