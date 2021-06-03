import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { COUNT_COMMENTS } from '../lib/queries';

interface Props {
    postId: number;
}

const CommentCount: React.FC<Props> = ({ postId }: Props) => {
    const [count, setCount] = useState(0);
    const [countVisible, setCountVisible] = useState(true);

    const { loading, error, data, refetch } = useQuery(COUNT_COMMENTS, {
        variables: { post_id: postId },
    });

    useEffect(() => {
        if (!loading && !error) {
            setCount(data.comments_aggregate.aggregate.count);
            setCountVisible(true);
        }
    }, [data]);

    return (
        <>{countVisible ? <Text style={{ color: 'white', fontSize: 20 }}>{count}</Text> : <></>}</>
    );
};

export default CommentCount;
