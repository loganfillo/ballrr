import { useApolloClient, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Storage } from 'aws-amplify';
import NotificationItem from '../components/NotificationItem';
import { GET_NOTIFICATIONS, UPDATE_NOTIFICATIONS } from '../lib/queries';
import { Notification } from '../lib/types';
import { useUser } from '../lib/user';
import { StackNavigationProp } from '@react-navigation/stack';

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
                    fetchedLikes.push({
                        username: notif.notifier_user_id.username,
                        redirect_id:
                            notif.notification_type === 'FOLLOW'
                                ? notif.notifier_user_id.id
                                : notif.liked_post.id,
                        type: notif.notification_type,
                        notifier_user_id: notif.notifier_user_id.id,
                        profile_thumbnail:
                            notif.notifier_user_id.profile_pic === null
                                ? undefined
                                : ((await Storage.get(
                                      notif.notifier_user_id.profile_pic.s3_key,
                                  )) as string),
                        post_thumbnail:
                            notif.liked_post === null
                                ? undefined
                                : ((await Storage.get(
                                      notif.liked_post.thumbnail.s3_key,
                                  )) as string),
                        seen: notif.notification_seen,
                        timestamp: notif.created_at,
                        comment: notif.notification_type === 'COMMENT' ? notif.comment : undefined,
                    });

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
                    <NotificationItem
                        key={index}
                        username={notification.username}
                        notifType={notification.type}
                        prof_thumbnail={notification.profile_thumbnail}
                        post_thumbnail={notification.post_thumbnail}
                        timestamp={notification.timestamp}
                        curr_userId={user.id}
                        notifier_userId={notification.notifier_user_id}
                        postId={notification.redirect_id}
                        comment_message={notification.comment}
                    />
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
