import { CREATE_PROFILE_PIC_MEDIA, UPDATE_USER, DELETE_PROFILE_PIC_MEDIA } from './queries';
import { deleteFromS3, uploadMediaToS3 } from './media';
import { Alert } from 'react-native';
import { Flag, Media, UploadedMedia, User } from './types';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

/**
 * Saves the profile of the user. If the profile picture
 * has been changed, deletes the old one before updating
 * with the new one.
 *
 * @param user The user  whose profile it is
 * @param bio The bio to set
 * @param name The name to set
 * @param flag The flag to set
 * @param profPic The profile pic to set
 * @param hasProfPicChanged If the profile pic has changes
 * @param prevProfPicKey The previous profile pic S3 key
 * @param position Position of the player to set (Attribute)
 * @param location Location of the player to set (Attribute)
 * @param height Height of the player to set (Attribute)
 * @param weight Weight of the player to set (Attribute)
 * @param foot Foot of the player to set (Attribute)
 * @param league League of the player to set (Attribute)
 * @param apolloClient GraphQL client
 */

export async function saveProfileChanges(
    user: User,
    bio: string,
    name: string,
    flag: Flag,
    profPic: Media,
    hasProfPicChanged: boolean,
    prevProfPicKey: string,
    position: string,
    location: string,
    height: string,
    weight: string,
    foot: string,
    league: string,
    apolloClient: ApolloClient<NormalizedCacheObject>,
): Promise<void> {
    console.log('saving profile with position as ' + position);
    await apolloClient.mutate({
        mutation: UPDATE_USER,
        variables: {
            user_id: user.id,
            bio: bio,
            name: name,
            flag: JSON.stringify(flag),
            position: position,
            location: location,
            height: height,
            weight: weight,
            foot: foot,
            league: league,
        },
    });
    if (!profPic.cancelled) {
        if (hasProfPicChanged) {
            await apolloClient.mutate({
                mutation: DELETE_PROFILE_PIC_MEDIA,
                variables: { user_id: user.id },
            });
            await deleteFromS3(prevProfPicKey);
        }
        const uploadedMedia: UploadedMedia = await uploadMediaToS3(profPic);
        if (
            uploadedMedia.ok &&
            uploadedMedia.name !== undefined &&
            uploadedMedia.type !== undefined
        ) {
            try {
                await createProfilePicMediaEntry(user.id, uploadedMedia.name, apolloClient);
            } catch (e) {
                console.log(e);
                Alert.alert('Could not upload profile pic to DB');
            }
        } else {
            Alert.alert('Could not upload profile pic to S3');
        }
    }
}

/**
 * Creates the profile pic media in the databse
 *
 * @param userId Id of the user
 * @param s3Key The s3 key of the profile pic
 * @param apolloClient GraphQL client
 */
async function createProfilePicMediaEntry(
    userId: number,
    s3Key: string,
    apolloClient: ApolloClient<NormalizedCacheObject>,
): Promise<void> {
    await apolloClient.mutate({
        mutation: CREATE_PROFILE_PIC_MEDIA,
        variables: { user_id: userId, s3_key: s3Key },
    });
}
