import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { GET_USERS } from '../lib/queries';
import { DisplayUsers } from '../lib/types';
import { useUser } from '../lib/user';
import { Storage } from 'aws-amplify';
import { Col, Row, View } from 'native-base';
import DefaultSearchItem from './DefaultSearchItem';

const HardCodedSearchScreen: React.FC = () => {
    const user = useUser();
    const [users, setUsers] = useState<DisplayUsers[]>([]);

    const { loading, error, data } = useQuery(GET_USERS, {
        variables: {
            user_id: user.id,
        },
        fetchPolicy: 'cache-and-network',
    });

    useEffect(() => {
        async function fetchUsers() {
            if (!loading && !error) {
                const fetchedUsers: DisplayUsers[] = [];
                for (const user of data.users) {
                    fetchedUsers.push({
                        userId: user.id,
                        username: user.username,
                        fullName: user.full_name,
                        position: user.position,
                        profPicUrl:
                            user.profile_pic === null
                                ? undefined
                                : ((await Storage.get(user.profile_pic.s3_key)) as string),
                    });
                }
                setUsers(fetchedUsers);
            }
        }
        fetchUsers();
    }, [data]);

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}
        >
            {users.map((user, index) => {
                return (
                    <DefaultSearchItem
                        key={index}
                        username={user.username}
                        full_name={user.fullName}
                        position={user.position}
                        resultUserId={user.userId}
                        profile_pic={user.profPicUrl}
                    />
                );
            })}
        </View>
    );
};

export default HardCodedSearchScreen;
