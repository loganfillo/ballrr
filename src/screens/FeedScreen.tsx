import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_ALL_POSTS } from '../lib/queries';
import { Post } from '../lib/types';
import FeedPost from '../components/feed/FeedPost';
import ViewPager from '@react-native-community/viewpager';
import { useIsFocused } from '@react-navigation/native';
import { View } from 'react-native';
import { Storage } from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';

const FeedScreen: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [selected, setSelected] = useState(0);

    const isFocused = useIsFocused();

    useEffect(() => {
        refetch();
    }, [isFocused]);

    const { loading, error, data, refetch } = useQuery(GET_ALL_POSTS);

    useEffect(() => {
        async function fetchPosts() {
            if (!loading && !error) {
                const fetchedPosts: Post[] = [];
                for (const post of data.posts) {
                    fetchedPosts.push({
                        userId: post.user_id,
                        profPicUrl: (await Storage.get(
                            post.post_user_id.profile_pic.s3_key,
                        )) as string,
                        fullName: post.post_user_id.full_name,
                        username: post.post_user_id.username,
                        url: (await Storage.get(post.media.s3_key)) as string,
                        caption: post.caption,
                        type: post.media.type,
                        id: post.id,
                        s3Key: post.media.s3_key,
                    });
                }
                setPosts(fetchedPosts);
            }
        }
        fetchPosts();
    }, [data]);

    return (
        <>
            {isFocused ? <StatusBar style={'light'} /> : null}
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <ViewPager
                    style={{ flex: 1 }}
                    initialPage={0}
                    orientation="vertical"
                    onPageSelected={(e) => {
                        setSelected(e.nativeEvent.position);
                    }}
                >
                    {posts.map((post, id) => {
                        return (
                            <View key={id}>
                                <FeedPost
                                    key={id}
                                    post={post}
                                    shouldPlay={selected === id && isFocused}
                                />
                            </View>
                        );
                    })}
                </ViewPager>
            </View>
        </>
    );
};

export default FeedScreen;
