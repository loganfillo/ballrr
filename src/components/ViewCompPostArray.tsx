import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View, TouchableOpacity } from 'react-native';
import { GET_COMPETITION_SUBMISSIONS } from '../lib/queries';
import { ThumbnailPost } from '../lib/types';
import { Storage } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';

interface Props {
    compId: number;
    refreshing: boolean;
}

const ViewCompPostArray: React.FC<Props> = ({ compId, refreshing }: Props) => {
    const [posts, setPosts] = useState<ThumbnailPost[]>([]);

    const { width } = Dimensions.get('window');
    const navigation = useNavigation();

    const { loading, error, data, refetch } = useQuery(GET_COMPETITION_SUBMISSIONS, {
        variables: {
            comp_id: compId,
        },
        fetchPolicy: 'cache-and-network',
    });

    useEffect(() => {
        refetch();
    }, [refreshing]);

    function navigateToCompetitionFeed(listId: number) {
        navigation.navigate('FeedNavigator', {
            screen: 'Feed',
            params: { postIds: posts.map((post) => post.id), listId: listId },
        });
    }

    useEffect(() => {
        async function fetchPosts() {
            if (!loading && !error) {
                const fetchedPosts: ThumbnailPost[] = [];
                for (const submission of data.competition_submission) {
                    const post = submission.post;
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
                paddingHorizontal: 5,
            }}
        >
            {posts.map((post, id) => {
                return (
                    <View key={id} style={{ padding: 1 }}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => navigateToCompetitionFeed(id)}
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

export default ViewCompPostArray;
