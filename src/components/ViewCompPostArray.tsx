import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View, TouchableOpacity } from 'react-native';
import { GET_COMPETITION_SUBMISSIONS } from '../lib/queries';
import { ThumbnailPost } from '../lib/types';
import { Storage } from 'aws-amplify';

interface Props {
    compId: number;
}

const ViewCompPostArray: React.FC<Props> = ({ compId }: Props) => {
    const [posts, setPosts] = useState<ThumbnailPost[]>([]);

    const { width } = Dimensions.get('window');

    const { loading, error, data } = useQuery(GET_COMPETITION_SUBMISSIONS, {
        variables: {
            comp_id: compId,
        },
        fetchPolicy: 'cache-and-network',
    });

    console.log(error);

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
            }}
        >
            {posts.map((post, id) => {
                return (
                    <View key={id} style={{ padding: 1 }}>
                        <TouchableOpacity activeOpacity={0.5}>
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
