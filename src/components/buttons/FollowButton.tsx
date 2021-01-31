import { Button, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import { CHECK_IF_FOLLOWING, FOLLOW_USER, UNFOLLOW_USER } from '../../lib/queries';

interface Props {
    userId: number;
    profileUserId: number;
}
const FollowButton: React.FC<Props> = ({ userId, profileUserId }: Props) => {
    const [following, setFollowing] = useState(false);
    const [followingVisible, setFollowingVisible] = useState(false);
    const [followingLoading, setFollowingLoading] = useState(true);

    const apolloClient = useApolloClient();

    const { loading, error, data } = useQuery(CHECK_IF_FOLLOWING, {
        variables: { user_id: userId, user_followed_id: profileUserId },
        fetchPolicy: 'cache-and-network',
    });

    async function followOrUnfollowUser() {
        setFollowingLoading(true);
        if (following) {
            await apolloClient.mutate({
                mutation: UNFOLLOW_USER,
                variables: { user_id: userId, user_followed_id: profileUserId },
            });
            setFollowing(false);
        } else {
            await apolloClient.mutate({
                mutation: FOLLOW_USER,
                variables: { user_id: userId, user_followed_id: profileUserId },
            });
            setFollowing(true);
        }
        setFollowingLoading(false);
    }

    useEffect(() => {
        if (!loading && !error) {
            if (data.followers.length > 0) {
                setFollowing(true);
            }
            setFollowingVisible(true);
            setFollowingLoading(false);
        }
    }, [data]);

    return (
        <>
            {followingVisible && (
                <View style={styles.buttonContainer}>
                    <Button
                        title={following ? 'Unfollow' : 'Follow'}
                        onPress={followOrUnfollowUser}
                        color={following ? 'red' : 'blue'}
                        disabled={followingLoading}
                    />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 1,
        borderColor: 'darkgrey',
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 8,
    },
});

export default FollowButton;
