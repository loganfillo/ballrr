import { View, StyleProp, ViewStyle, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import { CHECK_IF_FOLLOWING, FOLLOW_USER, UNFOLLOW_USER } from '../../lib/queries';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
                    <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 8 }}>
                        <TouchableOpacity
                            style={{ padding: 5 }}
                            disabled={followingLoading}
                            onPress={followOrUnfollowUser}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 14,
                                    fontWeight: '400',
                                    color: following ? 'red' : 'black',
                                }}
                            >
                                {following ? 'Unfollow' : 'Follow'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    );
};

export default FollowButton;
