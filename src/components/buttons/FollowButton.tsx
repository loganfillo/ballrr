import { View, StyleProp, ViewStyle } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import { CHECK_IF_FOLLOWING, FOLLOW_USER, UNFOLLOW_USER } from '../../lib/queries';
import ProfileButton from './ProfileButton';

interface Props {
    userId: number;
    profileUserId: number;
    style: StyleProp<ViewStyle>;
}
const FollowButton: React.FC<Props> = ({ userId, profileUserId, style }: Props) => {
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
                <View style={style}>
                    <ProfileButton
                        title={following ? 'Unfollow' : 'Follow'}
                        disabled={followingLoading}
                        color={following ? 'red' : 'black'}
                        onPress={followOrUnfollowUser}
                    />
                </View>
            )}
        </>
    );
};

export default FollowButton;
