import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View, TouchableOpacity } from 'react-native';
import { GET_USERS_POSTS, GET_POST_COMPETITION } from '../lib/queries';
import { ThumbnailPost } from '../lib/types';
import { Storage } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';

interface Props {
    profileUserId: number;
    refreshing: boolean;
    onLoad: (height: number) => void;
}

const ProfilePostArray: React.FC<Props> = ({ profileUserId, refreshing, onLoad }: Props) => {
    const [posts, setPosts] = useState<ThumbnailPost[]>([]);
    const navigation = useNavigation();

    const { width } = Dimensions.get('window');

    useEffect(() => {
        refetch();
    }, [refreshing]);

    const { loading, error, data, refetch } = useQuery(GET_USERS_POSTS, {
        variables: {
            user_id: profileUserId,
        },
        fetchPolicy: 'cache-and-network',
    });

    function navigateToProfileFeed(listId: number) {
        navigation.navigate('FeedNavigator', {
            screen: 'Feed',
            params: { postIds: posts.map((post) => post.id), listId: listId },
        });
    }

    useEffect(() => {
        async function fetchPosts() {
            if (!loading && !error) {
                const fetchedPosts: ThumbnailPost[] = [];
                for (const post of data.posts) {
                    const thumbnailUrl = (await Storage.get(post.thumbnail.s3_key)) as string;
                    fetchedPosts.push({
                        id: post.id,
                        url: thumbnailUrl,
                    });
                }
                setPosts(fetchedPosts);
                const rows = Math.ceil(fetchedPosts.length / 3) + 1;
                onLoad((rows * width) / 3);
            }
        }
        fetchPosts();
    }, [data]);

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}
        >
            {posts.map((post, id) => {
                return (
                    <ProfilePostArrayPic
                        key={id}
                        post={post}
                        posts={posts}
                        onPress={() => navigateToProfileFeed(id)}
                    />
                );
            })}
        </View>
    );
};

interface PicProps {
    key: number;
    post: ThumbnailPost;
    onPress: () => void;
}

const ProfilePostArrayPic: React.FC<PicProps> = ({ key, post, onPress }: PicProps) => {
    const [compId, setCompId] = useState(0);
    const { width } = Dimensions.get('window');

    const { loading, error, data } = useQuery(GET_POST_COMPETITION, {
        variables: { post_id: post.id },
    });
    useEffect(() => {
        async function getCompId() {
            if (!loading && !error) {
                if (data.competition_submission_aggregate.aggregate.count > 0) {
                    const competition_sub = data.competition_submission_aggregate.nodes[0];
                    setCompId(competition_sub.competition.id);
                }
            }
        }
        getCompId();
    }, [data]);

    return (
        <View key={key} style={{ padding: 1 }}>
            <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
                {compId !== 0 && (
                    <View
                        style={{
                            position: 'absolute',
                            width: 12,
                            aspectRatio: 1,
                            borderRadius: 100,
                            backgroundColor: 'orange',
                            zIndex: 100,
                            top: 5,
                            right: 5,
                        }}
                    ></View>
                )}
                <Image
                    style={{ width: width / 3 - 2, height: width / 3 - 2 }}
                    source={{
                        uri: post.url,
                    }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default ProfilePostArray;
