import { DocumentNode, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { COUNT_FOLLOWERS, COUNT_FOLLOWING, COUNT_USERS_POST } from '../lib/queries';

interface Props {
    name: string;
    query: DocumentNode;
    refreshing: boolean;
    profileUserId: number;
}

const ProfileCounts: React.FC<Props> = ({ name, query, refreshing, profileUserId }: Props) => {
    const [count, setCount] = useState(0);

    const { loading, error, data, refetch } = useQuery(query, {
        variables: { user_id: profileUserId },
    });

    useEffect(() => {
        refetch();
    }, [refreshing]);

    useEffect(() => {
        async function fetchCount() {
            if (!loading && !error) {
                if (query === COUNT_USERS_POST) {
                    setCount(data.posts_aggregate.aggregate.count);
                } else if (query === COUNT_FOLLOWERS) {
                    setCount(data.followers_aggregate.aggregate.count);
                } else if (query === COUNT_FOLLOWING) {
                    setCount(data.followers_aggregate.aggregate.count);
                }
            }
        }
        fetchCount();
    }, [data]);

    return (
        <View
            style={{
                flex: 2,
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <View style={{ marginBottom: 5 }}>
                <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '500' }}>
                    {count}
                </Text>
            </View>
            <View>
                <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: '100' }}>{name}</Text>
            </View>
        </View>
    );
};

export default ProfileCounts;
