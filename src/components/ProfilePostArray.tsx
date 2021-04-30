import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View, TouchableOpacity } from 'react-native';
import { GET_USERS_POSTS } from '../lib/queries';
import { ThumbnailPost } from '../lib/types';
import { Storage } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';

interface Props {
    profileUserId: number;
    refreshing: boolean;
}

const ProfilePostArray: React.FC<Props> = ({ profileUserId, refreshing }: Props) => {
    const [posts, setPosts] = useState<ThumbnailPost[]>([]);

    const { width } = Dimensions.get('window');
    const navigation = useNavigation();

    useEffect(() => {
        refetch();
    }, [refreshing]);

    const { loading, error, data, refetch } = useQuery(GET_USERS_POSTS, {
        variables: {
            user_id: profileUserId,
        },
        fetchPolicy: 'cache-and-network',
    });

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
            }
        }
        fetchPosts();
    }, [data]);

    function navigateToProfileFeed(listId: number) {
        navigation.navigate('FeedNavigator', {
            screen: 'Feed',
            params: { postIds: posts.map((post) => post.id), listId: listId },
        });
    }
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
                    <View key={id} style={{ padding: 1 }}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => navigateToProfileFeed(id)}
                        >
                            <Image
                                style={{ width: width / 3 - 2, height: width / 3 - 2 }}
                                source={{
                                    uri: post.url,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
};

export default ProfilePostArray;
