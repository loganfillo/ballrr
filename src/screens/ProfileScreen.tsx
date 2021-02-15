import { useQuery } from '@apollo/client';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Storage } from 'aws-amplify';
import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { GET_USERS_POSTS } from '../lib/queries';
import { ProfilePost } from '../lib/types';
import { useUser } from '../lib/user';
import { SearchStackParamList } from '../components/navigators/SearchNavigator';
import ProfilePostArray from '../components/ProfilePostArray';
import ProfileBio from '../components/ProfileBio';

const wait = (timeout: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};

type SearchProfileRouteProp = RouteProp<SearchStackParamList, 'SearchProfile'>;

const ProfileScreen: React.FC = (): JSX.Element => {
    const [refreshing, setRefreshing] = useState(false);
    const [posts, setPosts] = useState<ProfilePost[]>([]);
    const { params } = useRoute<SearchProfileRouteProp>();
    const user = useUser();
    const profileUserId = params !== undefined ? params.userId : user.id;

    const { loading, error, data, refetch } = useQuery(GET_USERS_POSTS, {
        variables: {
            user_id: profileUserId,
        },
        fetchPolicy: 'cache-and-network',
    });

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        wait(1000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        async function fetchPosts() {
            if (!loading && !error) {
                const fetchedPosts: ProfilePost[] = [];
                for (const post of data.posts) {
                    const thumbnailUrl = (await Storage.get(post.thumbnail.s3_key)) as string;
                    fetchedPosts.push({
                        id: post.id,
                        url: thumbnailUrl,
                    });
                }
                setPosts(fetchedPosts);
            }
        }
        fetchPosts();
    }, [data]);

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: 'white' }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <ProfileBio profileUserId={profileUserId} />
            <ProfilePostArray posts={posts} />
        </ScrollView>
    );
};

export default ProfileScreen;
