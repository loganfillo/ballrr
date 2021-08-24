import { useQuery, useApolloClient } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { CHECK_IF_FOLLOWING, FOLLOW_USER } from '../lib/queries';

interface Props {
    username: string;
    notifType: string;
    prof_thumbnail: string;
    post_thumbnail: string | undefined;
    timestamp: number;
    curr_userId: number;
    notifier_userId: number;
    postId: number;
    comment_message: string;
}
const NotificationItem: React.FC<Props> = ({
    username,
    notifType,
    prof_thumbnail,
    post_thumbnail,
    timestamp,
    curr_userId,
    notifier_userId,
    postId,
    comment_message,
}: Props) => {
    const [following, setFollowing] = useState(false);
    const apolloClient = useApolloClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navigation = useNavigation<StackNavigationProp<any>>();
    const { loading, error, data } = useQuery(CHECK_IF_FOLLOWING, {
        variables: { user_id: curr_userId, user_followed_id: notifier_userId },
        fetchPolicy: 'cache-and-network',
    });

    function navigateToProfile(userId: number) {
        navigation.push('Profile', { userId });
    }

    function navigateToPost(post_id: number) {
        navigation.push('FeedNavigator', {
            screen: 'Feed',
            params: { postIds: post_id, listId: 0 },
        });
    }

    async function followUser(userId: number, profileUserId: number) {
        await apolloClient.mutate({
            mutation: FOLLOW_USER,
            variables: { user_id: userId, user_followed_id: profileUserId },
        });
        setFollowing(true);
    }

    useEffect(() => {
        if (!loading && !error) {
            if (data.followers.length > 0) {
                setFollowing(true);
            }
        }
    }, [data]);

    return (
        <View style={styles.container}>
            {notifType === 'LIKE' && (
                <>
                    <TouchableOpacity onPress={() => navigateToProfile(notifier_userId)}>
                        <View style={styles.thumbnailPic}>
                            {prof_thumbnail ? (
                                <Avatar.Image
                                    size={54}
                                    source={{
                                        uri: prof_thumbnail,
                                    }}
                                />
                            ) : (
                                <View
                                    style={{
                                        borderColor: 'lightgrey',
                                        borderWidth: 1,
                                        borderRadius: 100,
                                        height: undefined,
                                        aspectRatio: 1,
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: 'lightgrey',
                                            fontSize: 50,
                                            textAlign: 'center',
                                        }}
                                    >
                                        ?
                                    </Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                    <View style={styles.notifInfoLikesComments}>
                        <TouchableOpacity onPress={() => navigateToPost(postId)}>
                            <Text>
                                <Text style={{ fontWeight: '600' }}>@{username}</Text> liked your
                                post.&nbsp;
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
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigateToPost(postId)}>
                        <View style={{ marginLeft: 10 }}>
                            <Image
                                style={{ width: 40, height: 40 }}
                                source={{
                                    uri: post_thumbnail,
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                </>
            )}
            {notifType === 'COMMENT' && (
                <>
                    <TouchableOpacity onPress={() => navigateToProfile(notifier_userId)}>
                        <View style={styles.thumbnailPic}>
                            {prof_thumbnail ? (
                                <Avatar.Image
                                    size={54}
                                    source={{
                                        uri: prof_thumbnail,
                                    }}
                                />
                            ) : (
                                <View
                                    style={{
                                        borderColor: 'lightgrey',
                                        borderWidth: 1,
                                        borderRadius: 100,
                                        height: undefined,
                                        aspectRatio: 1,
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: 'lightgrey',
                                            fontSize: 50,
                                            textAlign: 'center',
                                        }}
                                    >
                                        ?
                                    </Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                    <View style={styles.notifInfoLikesComments}>
                        <TouchableOpacity onPress={() => navigateToPost(postId)}>
                            <Text>
                                <Text style={{ fontWeight: '600' }}>@{username}</Text> commented
                                &ldquo;
                                {comment_message}&rdquo; on your post.&nbsp;
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
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigateToPost(postId)}>
                        <View style={{ marginLeft: 10 }}>
                            <Image
                                style={{ width: 40, height: 40 }}
                                source={{
                                    uri: post_thumbnail,
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                </>
            )}
            {notifType === 'FOLLOW' && (
                <>
                    <TouchableOpacity onPress={() => navigateToProfile(notifier_userId)}>
                        <View style={styles.thumbnailPic}>
                            {prof_thumbnail ? (
                                <Avatar.Image
                                    size={54}
                                    source={{
                                        uri: prof_thumbnail,
                                    }}
                                />
                            ) : (
                                <View
                                    style={{
                                        borderColor: 'lightgrey',
                                        borderWidth: 1,
                                        borderRadius: 100,
                                        height: undefined,
                                        aspectRatio: 1,
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: 'lightgrey',
                                            fontSize: 50,
                                            textAlign: 'center',
                                        }}
                                    >
                                        ?
                                    </Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                    <View style={styles.notifInfoFollow}>
                        <TouchableOpacity onPress={() => navigateToProfile(notifier_userId)}>
                            <Text>
                                <Text style={{ fontWeight: '600' }}>@{username}</Text> started
                                following You.&nbsp;
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
                        </TouchableOpacity>
                    </View>
                    <View>
                        {following ? (
                            <TouchableOpacity onPress={() => navigateToProfile(notifier_userId)}>
                                <View
                                    style={{
                                        paddingVertical: 10,
                                        paddingHorizontal: 15,
                                        backgroundColor: 'lightgrey',
                                        borderRadius: 5,
                                    }}
                                >
                                    <Text style={{ color: 'black', fontWeight: '600' }}>
                                        View Profile
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() => followUser(curr_userId, notifier_userId)}
                            >
                                <View
                                    style={{
                                        paddingVertical: 10,
                                        paddingHorizontal: 15,
                                        backgroundColor: '#44B244',
                                        borderRadius: 5,
                                    }}
                                >
                                    <Text style={{ color: 'white', fontWeight: '600' }}>
                                        Follow Back
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </>
            )}
            {notifType === 'SHARED_POST' && (
                <>
                    <TouchableOpacity onPress={() => navigateToProfile(notifier_userId)}>
                        <View style={styles.thumbnailPic}>
                            {prof_thumbnail ? (
                                <Avatar.Image
                                    size={54}
                                    source={{
                                        uri: prof_thumbnail,
                                    }}
                                />
                            ) : (
                                <View
                                    style={{
                                        borderColor: 'lightgrey',
                                        borderWidth: 1,
                                        borderRadius: 100,
                                        height: undefined,
                                        aspectRatio: 1,
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: 'lightgrey',
                                            fontSize: 50,
                                            textAlign: 'center',
                                        }}
                                    >
                                        ?
                                    </Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                    <View style={styles.notifInfoLikesComments}>
                        <TouchableOpacity onPress={() => navigateToPost(postId)}>
                            <Text>
                                <Text style={{ fontWeight: '600' }}>@{username}</Text> shared a post
                                with you&nbsp;
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
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigateToPost(postId)}>
                        <View style={{ marginLeft: 10 }}>
                            <Image
                                style={{ width: 40, height: 40 }}
                                source={{
                                    uri: post_thumbnail,
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    thumbnailPic: {
        marginLeft: 15,
        flexBasis: 40,
    },
    notifInfoLikesComments: {
        flexDirection: 'column',
        marginLeft: 10,
        flexBasis: 250,
        fontSize: 20,
    },
    notifInfoFollow: {
        flexDirection: 'column',
        marginLeft: 10,
        flexBasis: 190,
        fontSize: 20,
    },
});

export default NotificationItem;
