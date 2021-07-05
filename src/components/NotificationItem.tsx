import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { Image, View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Avatar } from 'react-native-paper';
import { CHECK_IF_FOLLOWING } from '../lib/queries';
import ProfileButton from './buttons/ProfileButton';

interface Props {
    username: string;
    notifType: string;
    prof_thumbnail: string;
    post_thumbnail: string | undefined;
    timestamp: number;
    curr_userId: number;
    notifier_userId: number;
}
const NotificationItem: React.FC<Props> = ({
    username,
    notifType,
    prof_thumbnail,
    post_thumbnail,
    timestamp,
    curr_userId,
    notifier_userId,
}: Props) => {
    const [following, setFollowing] = useState(false);

    const { loading, error, data } = useQuery(CHECK_IF_FOLLOWING, {
        variables: { user_id: curr_userId, user_followed_id: notifier_userId },
        fetchPolicy: 'cache-and-network',
    });

    useEffect(() => {
        if (!loading && !error) {
            if (data.followers.length > 0) {
                setFollowing(true);
            }
        }
    }, [data]);

    return (
        <View style={styles.container}>
            <View style={styles.thumbnailPic}>
                <Avatar.Image
                    size={40}
                    source={{
                        uri: prof_thumbnail,
                    }}
                />
            </View>
            <View style={styles.notifInfo}>
                {notifType === 'LIKE' && (
                    <Text>
                        <Text style={{ fontWeight: '600' }}>@{username}</Text> has Liked Your
                        Post.&nbsp;
                        <Moment
                            element={Text}
                            fromNow
                            style={{
                                fontSize: 10,
                                color: 'black',
                                fontWeight: 'normal',
                                alignSelf: 'flex-end',
                            }}
                        >
                            {timestamp}
                        </Moment>
                    </Text>
                )}
                {notifType === 'FOLLOW' && (
                    <Text>
                        <Text style={{ fontWeight: '600' }}>@{username}</Text> has started Following
                        You.&nbsp;
                        <Moment
                            element={Text}
                            fromNow
                            style={{
                                fontSize: 10,
                                color: 'black',
                                fontWeight: 'normal',
                                alignSelf: 'flex-end',
                            }}
                        >
                            {timestamp}
                        </Moment>
                    </Text>
                )}
            </View>
            <View style={{ marginLeft: 10 }}>
                <Image
                    style={{ width: 40, height: 40 }}
                    source={{
                        uri: post_thumbnail,
                    }}
                />
            </View>
            {/* {notifType === 'FOLLOW' && (
                <View style={{ width: 40, height: 40 }}>
                    <Button
                        title={following ? 'View Profile' : 'Follow'}
                        color={'green'}
                        onPress={() => Alert.alert('Simple Button pressed')}
                    />
                </View>
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: '#EEEADE',
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingVertical: 10,
    },
    thumbnailPic: {
        marginLeft: 15,
        flexBasis: 40,
    },
    notifInfo: {
        flexDirection: 'column',
        marginLeft: 10,
        marginTop: 10,
        flexBasis: 250,
        fontSize: 20,
    },
});

export default NotificationItem;
