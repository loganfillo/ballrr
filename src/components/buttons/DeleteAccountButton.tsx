import React, { useEffect, useState } from 'react';
import { StyleProp, View, ViewStyle, Alert } from 'react-native';
import ProfileButton from './ProfileButton';
import { Auth } from 'aws-amplify';
import { GET_USERS_MEDIA, DELETE_USER } from '../../lib/queries';
import { useUser } from '../../lib/user';
import { useQuery, useMutation } from '@apollo/client';
import { deleteFromS3 } from '../../lib/media';
import { CognitoUser } from 'amazon-cognito-identity-js';

interface Props {
    style: StyleProp<ViewStyle>;
}

const DeleteAccountButton: React.FC<Props> = ({ style }: Props) => {
    const user = useUser();

    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const { loading, error, data, refetch } = useQuery(GET_USERS_MEDIA, {
        variables: { user_id: user.id },
    });
    const [deleteUser] = useMutation(DELETE_USER, {
        variables: { user_id: user.id },
    });

    useEffect(() => {
        async function checkDeleteUser() {
            const cognitoUser = await Auth.currentAuthenticatedUser();
            if (confirmDelete) {
                if (!loading && !error) {
                    for (const post of data.posts) {
                        deleteFromS3(post.thumbnail.s3_key);
                        deleteFromS3(post.media.s3_key);
                    }
                    if (data.users[0] != null && data.users[0].profile_pic != null)
                        deleteFromS3(data.users[0].profile_pic.s3_key);
                    deleteUser();
                    Alert.alert('User Deleted');
                    console.log('cognito user is ');
                    if (cognitoUser != undefined) cognitoUser.deleteUser();
                    Auth.signOut();
                }
            }
        }
        checkDeleteUser();
    }, [confirmDelete, loading]);

    async function deleteAccount() {
        Alert.alert(
            'Delete User Account?',
            'This action cannot be undone',
            [
                {
                    text: 'Cancel',
                    onPress: () => setConfirmDelete(false),
                    style: 'cancel',
                },
                { text: 'Delete', onPress: () => setConfirmDelete(true) },
            ],
            { cancelable: false },
        );
    }
    return (
        <View style={style}>
            <ProfileButton title={'Delete Account'} onPress={deleteAccount} color={'red'} />
        </View>
    );
};

export default DeleteAccountButton;
