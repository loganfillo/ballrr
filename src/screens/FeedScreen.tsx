import { useApolloClient, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_POSTS, GET_POSTS_BY_ID, GET_FOLLOWING } from '../lib/queries';
import { Post } from '../lib/types';
import FeedPost from '../components/FeedPost';
import PagerView from 'react-native-pager-view';
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native';
import { Dimensions, Text, View, Animated, Alert } from 'react-native';
import { Storage } from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import { FeedStackParamList } from '../components/navigators/FeedNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser } from '../lib/user';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

type FeedRouteProp = RouteProp<FeedStackParamList, 'Feed'>;

const FeedScreen: React.FC = () => {
    const { params } = useRoute<FeedRouteProp>();

    const [posts, setPosts] = useState<Post[]>([]);
    const [selected, setSelected] = useState(params?.listId === undefined ? 0 : params.listId);

    const isFocused = useIsFocused();
    const apolloClient = useApolloClient();
    const { height } = Dimensions.get('window');

    const user = useUser();

    useEffect(() => {
        async function getPosts() {
            const prevPosts = posts;

            const followingQuery = await apolloClient.query({
                query: GET_FOLLOWING,
                variables: { user_id: user.id },
            });

            let following_ids = [];

            if (followingQuery?.data?.followers == null) {
                Alert.alert("You aren't following anyone!");
            } else {
                following_ids = Object.keys(followingQuery.data.followers).map(function (k) {
                    return followingQuery.data.followers[k].user_followed.id;
                });
            }

            const res = await apolloClient.query({
                query: params?.postIds === undefined ? GET_POSTS : GET_POSTS_BY_ID,
                variables:
                    params?.postIds === undefined
                        ? { following_ids: following_ids }
                        : { post_ids: params.postIds },
            });

            setPosts(await organizePosts(res.data.posts));
            if (posts.length != prevPosts.length) {
                setSelected(0);
            }
        }
        getPosts();
    }, [isFocused]);
    /*
    const following_ids = [1];
    const { loading, error, data } = useQuery(
        params?.postIds === undefined ? GET_POSTS : GET_POSTS_BY_ID,
        {
            variables:
                params?.postIds === undefined
                    ? { following_ids: following_ids }
                    : { post_ids: params.postIds },
        },
    );

    useEffect(() => {
        async function fetchPosts() {
            if (!loading && !error) {
                setPosts(await organizePosts(data.posts));
            }
        }
        fetchPosts();
    }, [data]);*/

    async function organizePosts(posts: any) {
        const fetchedPosts: Post[] = [];
        for (const post of posts) {
            fetchedPosts.push({
                userId: post.user_id,
                profPicUrl:
                    post.post_user_id.profile_pic == null
                        ? 'https://www.macmillandictionary.com/external/slideshow/full/Grey_full.png'
                        : ((await Storage.get(post.post_user_id.profile_pic.s3_key)) as string),
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
        // Sort by postids if response is cached
        if (params?.postIds !== undefined) {
            fetchedPosts.sort(function (a, b) {
                const A: number = a.id;
                const B: number = b.id;
                if (params.postIds.indexOf(A) > params.postIds.indexOf(B)) {
                    return 1;
                } else {
                    return -1;
                }
            });
        }
        return fetchedPosts;
    }

    return (
        <>
            {isFocused ? <StatusBar style={'dark'} /> : null}
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                {params?.postIds !== undefined && (
                    <View
                        style={{
                            flex: 1,
                            position: 'absolute',
                            top: 0.05 * height,
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            zIndex: 100,
                        }}
                    >
                        <MaterialCommunityIcons
                            name={'chevron-left'}
                            size={0.025 * height}
                            color={'white'}
                        />
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 14,
                                textAlign: 'center',
                            }}
                        >
                            Swipe To Return
                        </Text>
                    </View>
                )}
                <AnimatedPagerView
                    style={{ flex: 1 }}
                    initialPage={selected}
                    orientation="vertical"
                    onPageSelected={(e) => {
                        setSelected(e.nativeEvent.position);
                    }}
                >
                    {posts.map((post, id) => {
                        return (
                            <View key={post.id}>
                                <FeedPost post={post} shouldPlay={selected === id && isFocused} />
                            </View>
                        );
                    })}
                </AnimatedPagerView>
            </View>
        </>
    );
};

export default FeedScreen;
