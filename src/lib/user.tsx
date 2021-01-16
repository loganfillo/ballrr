import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from './types';
import { useApolloClient } from '@apollo/client';
import { CREATE_USER, GET_USER } from './queries';
import { Auth } from 'aws-amplify';
import Loading from '../components/Loading';
import { Alert } from 'react-native';

const UserContext = createContext<User>({
    id: -1,
});

/**
 * A hook to access the user, alerts if user was not properly set
 */
export const useUser = (): User => {
    const user = useContext(UserContext);
    if (user.id < 0) {
        Alert.alert('Something went wrong, please close the app and try again.');
    }
    return user;
};

interface Props {
    children: React.ReactNode;
}

/**
 * A provider for the User context
 */
export const UserProvider: React.FC<Props> = ({ children }: Props) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User>({
        id: -1,
    });

    const apolloClient = useApolloClient();

    useEffect(() => {
        setLoading(true);
        async function handleuser() {
            try {
                const cognitoUser = await Auth.currentAuthenticatedUser();

                const userId = cognitoUser.attributes.sub;
                const res = await apolloClient.mutate({
                    mutation: CREATE_USER,
                    variables: { user_id: userId },
                });
                let id: number;
                if (res.data.insert_users_one !== null) {
                    id = res.data.insert_users_one.id;
                } else {
                    const res = await apolloClient.query({
                        query: GET_USER,
                        variables: { user_id: userId },
                    });
                    id = res.data.users[0].id;
                }
                setUser({
                    id,
                });
                setLoading(false);
            } catch (e) {
                console.log(e);
                Alert.alert('Something went wrong, please close the app and try again.');
            }
        }
        handleuser();
    }, []);

    if (loading) {
        return <Loading />;
    }
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
