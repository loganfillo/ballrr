import { CREATE_POST } from './queries';
import { uploadMediaToS3, createMedia } from './media';
import { Alert } from 'react-native';
import { Media, UploadedMedia, User } from './types';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

/**
 *Creates the post in the databse

 * @param apolloClient GraphQL client
 * @param user_id The posting user's ID
 * @param caption The post's caption
 * @param media_id The ID of the media database entry related to this post
 * @returns
 */
async function createPostEntry(
    apolloClient: ApolloClient<NormalizedCacheObject>,
    user_id: number,
    caption: string,
): Promise<number> {
    const res = await apolloClient.mutate({
        mutation: CREATE_POST,
        variables: { user_id, caption },
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
    caption: string,
): Promise<void> {
    const uploadedMedia: UploadedMedia = await uploadMediaToS3(media);
    if (uploadedMedia.ok && uploadedMedia.name !== undefined && uploadedMedia.type !== undefined) {
        const postID = await createPostEntry(apolloClient, user.id, caption);
        await createMedia(apolloClient, uploadedMedia.name, uploadedMedia.type, postID);
        Alert.alert('Post Uploaded!');
    } else {
        Alert.alert('Could not enter post into DB');
    }
}
