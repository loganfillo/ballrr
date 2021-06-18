import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_POSTS } from '../lib/queries';
import { Post } from '../lib/types';
import FeedPost from '../components/FeedPost';
import ViewPager from '@react-native-community/viewpager';
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native';
import { Dimensions, Text, View } from 'react-native';
import { Storage } from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import { FeedStackParamList } from '../components/navigators/FeedNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type FeedRouteProp = RouteProp<FeedStackParamList, 'Feed'>;

const FeedScreen: React.FC = () => {
    const { params } = useRoute<FeedRouteProp>();

    const [posts, setPosts] = useState<Post[]>([]);
    const [selected, setSelected] = useState(params?.listId === undefined ? 0 : params.listId);

    const isFocused = useIsFocused();
    const { height } = Dimensions.get('window');

    useEffect(() => {
        refetch();
    }, [isFocused, selected]);

    const { loading, error, data, refetch } = useQuery(GET_POSTS, {
        variables: params?.postIds === undefined ? {} : { post_ids: params.postIds },
    });

    useEffect(() => {
        async function fetchPosts() {
            if (!loading && !error) {
                const fetchedPosts: Post[] = [];
                for (const post of data.posts) {
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
                // SOot by postids if response is cached
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
                setPosts(fetchedPosts);
            }
        }
        fetchPosts();
    }, [data]);

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
                <ViewPager
                    style={{ flex: 1 }}
                    initialPage={selected}
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
