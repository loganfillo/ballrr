import {
    CREATE_COMPETITION,
    CREATE_COMPETITION_SUBMISSION,
    CREATE_POST,
    CREATE_POST_MEDIA,
    CREATE_THUMBNAIL_MEDIA,
    GET_POSTS,
} from './queries';
import { uploadMediaToS3 } from './media';
import { Alert } from 'react-native';
import { Competition, Media, MediaType, UploadedMedia, User } from './types';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

/**
 * Creates a competiton submission post.
 *
 * @param user The user which uploaded the post
 * @param apolloClient GraphQL client
 * @param media The media to post
 * @param caption The post's caption
 * @param compId The id of the competition this submission is for
 */
export async function createCompetitionSubmissionPost(
    user: User,
    apolloClient: ApolloClient<NormalizedCacheObject>,
    media: Media,
    thumbnail: Media,
    caption: string,
    compId: number,
    score: number,
): Promise<void> {
    const postId = await createPost(
        user,
        apolloClient as ApolloClient<NormalizedCacheObject>,
        media,
        thumbnail,
        caption,
    );
    if (postId > 0) {
        await createCompetitionSubmissionEntry(apolloClient, compId, postId, score);
    }
}

/**
 * Creates a competiton post. This is the original competition submission post
 *
 * @param user The user which uploaded the post
 * @param apolloClient GraphQL client
 * @param media The media to post
 * @param caption The post's caption
 * @param competition The competition the post creates
 */
export async function createCompetitionPost(
    user: User,
    apolloClient: ApolloClient<NormalizedCacheObject>,
    media: Media,
    thumbnail: Media,
    caption: string,
    competition: Competition,
): Promise<void> {
    const postId = await createPost(
        user,
        apolloClient as ApolloClient<NormalizedCacheObject>,
        media,
        thumbnail,
        caption,
    );
    if (postId > 0) {
        const compId = await createCompetitionEntry(apolloClient, competition, postId, user.id);
        await createCompetitionSubmissionEntry(
            apolloClient,
            compId,
            postId,
            competition.score || 0,
        );
    }
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
): Promise<number> {
    let postId = -1;
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
            postId = await createPostEntry(apolloClient, user.id, caption);
            await createPostMediaEntry(
                apolloClient,
                uploadedMedia.name,
                uploadedMedia.type,
                postId,
            );
            await createThumbnailMediaEntry(apolloClient, uploadedThumbnail.name, postId);
            await refetchPosts(apolloClient);
        } catch (e) {
            Alert.alert('Could Not Upload Post to DB');
        }
    } else {
        Alert.alert('Could Not Upload Post to S3');
    }
    return postId;
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

/**
 * Creates the competition in the database
 *
 * @param apolloClient GraphQL CLient
 * @param competition The competition to add
 * @param postId The id of post associated to this competition
 * @param userId The id of user who created competition
 */
async function createCompetitionEntry(
    apolloClient: ApolloClient<NormalizedCacheObject>,
    competition: Competition,
    postId: number,
    userId: number,
): Promise<number> {
    const res = await apolloClient.mutate({
        mutation: CREATE_COMPETITION,
        variables: {
            name: competition.name,
            description: competition.description,
            post_id: postId,
            user_id: userId,
            time_limit: competition.timeLimit,
            creator_score: competition.score,
            leaderboard_type: competition.leaderboardType,
        },
    });
    return res.data.insert_competitions_one.id;
}

/**
 * Creates the competition submission in the database
 *
 * @param apolloClient GraphQL CLient
 * @param postId The id of post associated to this competition
 * @param compId The id of the competition the post is being submitted to
 */
async function createCompetitionSubmissionEntry(
    apolloClient: ApolloClient<NormalizedCacheObject>,
    compId: number,
    postId: number,
    score: number,
): Promise<number> {
    const res = await apolloClient.mutate({
        mutation: CREATE_COMPETITION_SUBMISSION,
        variables: { post_id: postId, comp_id: compId, score: score },
    });
    return res.data.insert_competition_submission_one.id;
}

async function refetchPosts(apolloClient: ApolloClient<NormalizedCacheObject>) {
    await apolloClient.query({
        query: GET_POSTS,
    });
}
