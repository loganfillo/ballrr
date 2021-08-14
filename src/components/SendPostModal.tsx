import React, { useState, useEffect } from 'react';
import {
    Text,
    SafeAreaView,
    View,
    Button,
    Modal,
    ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GET_FOLLOWERS } from '../lib/queries';
import { useQuery } from '@apollo/client';
import { Follower } from '../lib/types';
import { Storage } from 'aws-amplify';
import SendModalItem from './SendModalItem';

const PLACE_HOLDER_IMAGE = 'https://files.thehandbook.com/uploads/2019/03/ronaldo.jpg';

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    profileUserId: number;
    postId: number;
}

export const SendPostModal: React.FC<ModalProps> = ({
    visible,
    onClose,
    profileUserId,
    postId,
}: ModalProps) => {
    const { loading, error, data, refetch } = useQuery(GET_FOLLOWERS, {
        variables: {
            user_id: profileUserId,
        },
    });

    const [followers, setFollowers] = useState<Follower[]>([]);

    useEffect(() => {
        async function fetchFollowers() {
            if (!loading && !error) {
                const fetchedUsers: Follower[] = [];

                for (const user of data.followers) {
                    fetchedUsers.push({
                        username: user.user_follower.username,
                        fullName: user.user_follower.full_name,
                        userId: user.user_follower.id,
                        profPicUrl:
                            user.user_follower.profile_pic === null
                                ? PLACE_HOLDER_IMAGE
                                : ((await Storage.get(
                                      user.user_follower.profile_pic.s3_key,
                                  )) as string),
                    });
                }
                setFollowers(fetchedUsers);
            }
        }
        fetchFollowers();
    }, [data]);

    function exitModal() {
        onClose();
    }

    return (
        <Modal visible={visible}>
            <SafeAreaView>
                <StatusBar hidden />
                <View
                    style={{
                        backgroundColor: 'white',
                        padding: 5,
                        alignItems: 'flex-end',
                        flexDirection: 'row',
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'lightgrey',
                    }}
                >
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 20,
                            flexDirection: 'row',
                            flex: 1,
                            paddingHorizontal: 10,
                            paddingBottom: 5,
                        }}
                    >
                        Share Post With Followers
                    </Text>
                    <Button title={'Done'} onPress={exitModal} />
                </View>
            </SafeAreaView>
            <ScrollView>
                {followers.map((result, index) => {
                    return (
                        <SendModalItem
                            key={index}
                            curr_userId={profileUserId}
                            recipient_userId={result.userId}
                            recipient_userName={result.username}
                            recipient_fullName={result.fullName}
                            recipient_profilePic={result.profPicUrl}
                            postId={postId}
                            onClose={onClose}
                        />
                    );
                })}
            </ScrollView>
        </Modal>
    );
};
