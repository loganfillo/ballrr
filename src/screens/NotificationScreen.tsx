import { useApolloClient, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, RefreshControl, ListView } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import NotificationItem from '../components/NotificationItem';
import { GET_LIKES, UPDATE_LIKES_SEEN } from '../lib/queries';
import { Notification, NotificationType } from '../lib/types';
import { useUser } from '../lib/user';

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
    const navigation = useNavigation();

    const { loading, error, data, refetch } = useQuery(GET_LIKES, {
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
                for (const like of data.post_likes) {
                    const likeNotification: Notification = {
                        username: like.user_id_of_like.username,
                        type: NotificationType.LIKE,
                        id: like.id,
                        thumbnail: like.user_id_of_like.profile_pic.s3_key,
                        seen: like.notification_seen,
                    };
                    fetchedLikes.push(likeNotification);
                    if (!likeNotification.seen) {
                        seenIds.push(likeNotification.id);
                    }
                }
                await apolloClient.mutate({
                    mutation: UPDATE_LIKES_SEEN,
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
                        thumbnail={notification.thumbnail}
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
