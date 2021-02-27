import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { GET_USERS_POSTS } from '../../lib/queries';
import { ProfilePost } from '../../lib/types';
import { Storage } from 'aws-amplify';

interface Props {
    profileUserId: number;
    refreshing: boolean;
}

const ProfilePostArray: React.FC<Props> = ({ profileUserId, refreshing }: Props) => {
    const [posts, setPosts] = useState<ProfilePost[]>([]);

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
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                backgroundColor: 'white',
            }}
        >
            {posts.map((post, id) => {
                return (
                    <View key={id} style={{ padding: 1 }}>
                        <Image
                            style={{ width: width / 3 - 2, height: width / 3 - 2 }}
                            source={{
                                uri: post.url,
                            }}
                        />
                    </View>
                );
            })}
        </View>
    );
};

export default ProfilePostArray;
