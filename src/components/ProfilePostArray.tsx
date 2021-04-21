import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View, TouchableOpacity } from 'react-native';
import { GET_USERS_POSTS } from '../lib/queries';
import { ProfilePost } from '../lib/types';
import { Storage } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';

interface Props {
    profileUserId: number;
    refreshing: boolean;
    onLoad: (height: number) => void;
}

const ProfilePostArray: React.FC<Props> = ({ profileUserId, refreshing, onLoad }: Props) => {
    const [posts, setPosts] = useState<ProfilePost[]>([]);

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
                const fetchedPosts: ProfilePost[] = [];
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

    function navigateToProfileFeed(listId: number) {
        navigation.navigate('FeedNavigator', {
            screen: 'Feed',
            params: { userId: profileUserId, listId: listId },
        });
    }
    return (
        <View
            style={{
                height: 30,
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
