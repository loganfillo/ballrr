import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { COUNT_LIKES } from '../../lib/queries';

interface Props {
    postId: number;
    likeChanged: boolean;
}

const LikeCount: React.FC<Props> = ({ postId, likeChanged }: Props) => {
    const [count, setCount] = useState(0);
    const [countVisible, setCountVisible] = useState(false);

    const { loading, error, data, refetch } = useQuery(COUNT_LIKES, {
        variables: { post_id: postId },
    });

    useEffect(() => {
        if (!loading && !error) {
            setCount(data.post_likes_aggregate.aggregate.count);
            setCountVisible(true);
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [likeChanged]);

    return <>{countVisible ? <Text style={{ color: 'white' }}>{count}</Text> : <></>}</>;
};

export default LikeCount;
