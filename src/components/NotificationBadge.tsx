import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { COUNT_UNSEEN_NOTIFS } from '../lib/queries';
import { useUser } from '../lib/user';

interface Props {
    icon: React.ReactNode;
    top: number;
    right: number;
}

const NotificationBadge: React.FC<Props> = ({ icon, top, right }: Props) => {
    const [visible, setVisible] = useState(false);
    const [count, setCount] = useState(0);

    const user = useUser();
    const { width } = Dimensions.get('window');

    const { loading, error, data } = useQuery(COUNT_UNSEEN_NOTIFS, {
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
            {!loading && !error && visible && count > 0 ? (
                <View
                    style={{
                        borderRadius: 100,
                        backgroundColor: 'red',
                        width: 0.03 * width,
                        height: 0.03 * width,
                        position: 'absolute',
                        zIndex: 200,
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: top,
                        right: right,
                    }}
                ></View>
            ) : (
                <></>
            )}
            {icon}
        </View>
    );
};

export default NotificationBadge;
