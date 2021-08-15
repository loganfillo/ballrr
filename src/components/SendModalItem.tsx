import { useQuery, useApolloClient } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { CHECK_IF_POST_SHARED_PREV, SEND_POST_TO_FOLLOWER } from '../lib/queries';

interface Props {
    curr_userId: number;
    recipient_userId: number;
    recipient_userName: string;
    recipient_fullName: string;
    recipient_profilePic: string;
    postId: number;
    onClose: () => void;
}
const SendModalItem: React.FC<Props> = ({
    curr_userId,
    recipient_userId,
    recipient_userName,
    recipient_fullName,
    recipient_profilePic,
    postId,
    onClose,
}: Props) => {
    const navigation = useNavigation();
    const apolloClient = useApolloClient();
    const [hasBeenShared, setHasBeenShared] = useState(false);
    const { loading, error, data } = useQuery(CHECK_IF_POST_SHARED_PREV, {
        variables: { post_id: postId, user_id: curr_userId, user_notified_id: recipient_userId },
        fetchPolicy: 'cache-and-network',
    });

    function navigateToProfile(userId: number) {
        navigation.navigate('Profile', { screen: 'Profile', params: { userId } });
        exitModal();
    }

    async function sendPostToFollower(
        curr_userId: number,
        recipient_userId: number,
        postId: number,
    ) {
        await apolloClient.mutate({
            mutation: SEND_POST_TO_FOLLOWER,
            variables: { user_id: curr_userId, recipient_id: recipient_userId, post_id: postId },
        });
        setHasBeenShared(true);
    }

    function exitModal() {
        onClose();
    }

    useEffect(() => {
        if (!loading && !error) {
            for (const notif of data.notifications) {
                if (notif.user_notified_id === recipient_userId) {
                    setHasBeenShared(true);
                }
            }
        }
    }, [data]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigateToProfile(recipient_userId)}>
                <View style={styles.container}>
                    <View style={styles.profPic}>
                        {recipient_profilePic && (
                            <Avatar.Image
                                size={54}
                                source={{
                                    uri: recipient_profilePic,
                                }}
                            />
                        )}
                    </View>

                    <View style={styles.profInfo}>
                        <Text style={styles.username}>@{recipient_userName}</Text>
                        {recipient_fullName !== 'null' && (
                            <Text style={styles.fullname}>{recipient_fullName}</Text>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
            {hasBeenShared ? (
                <TouchableOpacity>
                    <View
                        style={{
                            paddingVertical: 10,
                            paddingHorizontal: 34.5,
                            backgroundColor: 'lightgrey',
                            borderRadius: 5,
                            marginTop: 13,
                        }}
                    >
                        <Text style={{ color: 'black', fontWeight: '600' }}>Sent</Text>
                    </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={() => sendPostToFollower(curr_userId, recipient_userId, postId)}
                >
                    <View
                        style={{
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            backgroundColor: '#44B244',
                            borderRadius: 5,
                            marginTop: 13,
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: '600' }}>Send Post</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 5,
    },
    profPic: {
        marginLeft: 15,
        flexBasis: 60,
    },
    username: {
        color: 'black',
        fontSize: 16,
        marginTop: 5,
        fontWeight: '600',
    },
    fullname: {
        color: 'grey',
        fontSize: 16,
    },
    profInfo: {
        flexDirection: 'column',
        marginLeft: 10,
        flexBasis: 170,
    },
});

export default SendModalItem;
