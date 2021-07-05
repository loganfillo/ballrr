import { useApolloClient, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Storage } from 'aws-amplify';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NotificationItem from '../components/NotificationItem';
import { GET_NOTIFICATIONS, UPDATE_NOTIFICATIONS } from '../lib/queries';
import { Notification } from '../lib/types';
import { useUser } from '../lib/user';
import { StackNavigationProp } from '@react-navigation/stack';

const PLACE_HOLDER_IMAGE = 'https://files.thehandbook.com/uploads/2019/03/ronaldo.jpg';

const wait = (timeout: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};

const NotificationScreen: React.FC = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const user = useUser();
    const apolloClient = useApolloClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navigation = useNavigation<StackNavigationProp<any>>();

    function handleNotificationNav(notification: Notification) {
        if (notification.type == 'FOLLOW') {
            const userId = notification.redirect_id;
            navigation.push('Profile', { userId });
        } else if (notification.type == 'LIKE') {
            const postId = notification.redirect_id;
            navigation.push('FeedNavigator', {
                screen: 'Feed',
                params: { postIds: postId, listId: 0 },
            });
        }
    }

    const { loading, error, data, refetch } = useQuery(GET_NOTIFICATIONS, {
        variables: { user_id: user.id },
    });

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        wait(1000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        refetch();
    }, [navigation]);

    useEffect(() => {
        async function handleNewNotifications() {
            if (!loading && !error) {
                const fetchedLikes: Notification[] = [];
                const seenIds = [];
                for (const notif of data.notifications) {
                    if (notif.notification_type == 'FOLLOW') {
                        fetchedLikes.push({
                            username: notif.notifier_user_id.username,
                            redirect_id: notif.notifier_user_id.id,
                            type: notif.notification_type,
                            thumbnail:
                                notif.notifier_user_id.profile_pic.s3_key === null
                                    ? PLACE_HOLDER_IMAGE
                                    : ((await Storage.get(
                                          notif.notifier_user_id.profile_pic.s3_key,
                                      )) as string),
                            seen: notif.notification_seen,
                        });
                    } else if (notif.notification_type == 'LIKE') {
                        fetchedLikes.push({
                            username: notif.notifier_user_id.username,
                            redirect_id: notif.liked_post.id,
                            type: notif.notification_type,
                            thumbnail: (await Storage.get(
                                notif.liked_post.thumbnail.s3_key,
                            )) as string,
                            seen: notif.notification_seen,
                        });
                    }
                    if (!notif.notification_seen) {
                        seenIds.push(notif.id);
                    }
                }

                await apolloClient.mutate({
                    mutation: UPDATE_NOTIFICATIONS,
                    variables: { like_ids: seenIds },
                });
                setNotifications(fetchedLikes);
            }
        }
        handleNewNotifications();
    }, [data]);

    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {notifications.map((notification, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleNotificationNav(notification)}
                    >
                        <NotificationItem
                            username={notification.username}
                            notifType={notification.type}
                            thumbnail={notification.thumbnail}
                        />
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
});

export default NotificationScreen;
