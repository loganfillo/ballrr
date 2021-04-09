import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_ALL_POSTS } from '../lib/queries';
import { Post } from '../lib/types';
import FeedPost from '../components/FeedPost';
import ViewPager from '@react-native-community/viewpager';
import { useIsFocused } from '@react-navigation/native';
import { View } from 'react-native';
import { Storage } from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import RefreshFeedButton from '../components/buttons/RefreshFeedButton';

const FeedScreen: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [selected, setSelected] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const isFocused = useIsFocused();

    const { loading, error, data, refetch } = useQuery(GET_ALL_POSTS, {
        fetchPolicy: 'network-only',
    });

    useEffect(() => {
        refetch();
        console.log('refetching...', posts.length);
        setRefreshing(false);
    }, [refreshing]);

    useEffect(() => {
        async function fetchPosts() {
            if (!loading && !error) {
                const fetchedPosts: Post[] = [];
                for (const post of data.posts) {
                    // console.log(post.post_user_id);

                    fetchedPosts.push({
                        userId: post.user_id,
                        profPicUrl:
                            post.post_user_id.profile_pic == null
                                ? 'https://www.macmillandictionary.com/external/slideshow/full/Grey_full.png'
                                : ((await Storage.get(
                                      post.post_user_id.profile_pic.s3_key,
                                  )) as string),
                        fullName: post.post_user_id.full_name,
                        username: post.post_user_id.username,
                        url: (await Storage.get(post.media.s3_key)) as string,
                        caption: post.caption,
                        type: post.media.type,
                        id: post.id,
                        s3Key: post.media.s3_key,
                        thumbnailS3Key: post.thumbnail.s3_key,
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
                {selected === 0 && (
                    <RefreshFeedButton
                        onPress={() => {
                            setRefreshing(true);
                        }}
                    />
                )}
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
                            <View style={{ flex: 1 }} key={id}>
                                <FeedPost post={post} shouldPlay={selected === id && isFocused} />
                            </View>
                        );
                    })}
                </ViewPager>
            </View>
        </>
    );
};

export default FeedScreen;
