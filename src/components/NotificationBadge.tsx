import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Badge } from 'react-native-paper';
import { COUNT_UNSEEN_LIKES } from '../lib/queries';
import { useUser } from '../lib/user';

interface Props {
    icon: React.ReactChild;
    top: number;
    right: number;
}

const NotificationBadge: React.FC<Props> = ({ icon, top, right }: Props) => {
    const [visible, setVisible] = useState(false);
    const [count, setCount] = useState(0);
    const user = useUser();
    const { loading, error, data } = useQuery(COUNT_UNSEEN_LIKES, {
        variables: { user_id: user.id },
        pollInterval: 500,
    });

    useEffect(() => {
        if (!loading && !error && data) {
            const newCount = data.post_likes_aggregate.aggregate.count;
            setCount(newCount);
            setVisible(data ? newCount > 0 : false);
        }
    }, [data]);

    return (
        <View>
            <Badge
                visible={!loading && !error && visible && count > 0}
                style={{ position: 'absolute', top, right, zIndex: 100 }}
                size={18}
            >
                {count}
            </Badge>
            {icon}
        </View>
    );
};

export default NotificationBadge;
