import { useQuery, useApolloClient } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { CHECK_IF_FOLLOWING, SEND_POST_TO_FOLLOWER } from '../lib/queries';

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
                        <Text style={styles.username}>{recipient_userName}</Text>
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
                            paddingHorizontal: 30,
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
        paddingVertical: 10,
    },
    profPic: {
        marginLeft: 15,
        flexBasis: 60,
    },
    username: {
        color: 'black',
        fontSize: 16,
        marginTop: 5,
        fontWeight: '500',
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
