import { CREATE_POST } from './queries';
import { uploadMediaToS3, createPostMedia, createThumbnailMedia } from './media';
import { Alert } from 'react-native';
import { Media, UploadedMedia, User } from './types';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

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
            await createPostMedia(apolloClient, uploadedMedia.name, uploadedMedia.type, postId);
            await createThumbnailMedia(apolloClient, uploadedThumbnail.name, postId);
            Alert.alert('Post Uploaded!');
        } catch (e) {
            Alert.alert('Could Not Upload Post');
        }
    }
}
