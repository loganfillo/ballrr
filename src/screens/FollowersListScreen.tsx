import { useQuery } from '@apollo/client';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { GET_FOLLOWERS } from '../lib/queries';
import { Follower } from '../lib/types';
import { Storage } from 'aws-amplify';
import { useUser } from '../lib/user';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../components/navigators/ProfileNavigator';
import FollowItem from '../components/FollowItem';

const PLACE_HOLDER_IMAGE = 'https://files.thehandbook.com/uploads/2019/03/ronaldo.jpg';

type FollowerRouteProp = RouteProp<ProfileStackParamList, 'FollowersList'>;

const FollowersList: React.FC = () => {
    const [followers, setFollowers] = useState<Follower[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navigation = useNavigation<StackNavigationProp<any>>();
    const { params } = useRoute<FollowerRouteProp>();
    const user = useUser();
    const profileUserId = params !== undefined ? params.userId : user.id;

    const { loading, error, data } = useQuery(GET_FOLLOWERS, {
        variables: {
            user_id: profileUserId,
        },
    });

    useEffect(() => {
        async function fetchFollowers() {
            if (!loading && !error) {
                const fetchedUsers: Follower[] = [];
                for (const user of data.followers) {
                    fetchedUsers.push({
                        username: user.user_follower.username,
                        fullName: user.user_follower.full_name,
                        userId: user.user_follower.id,
                        profPicUrl:
                            user.user_follower.profile_pic === null
                                ? PLACE_HOLDER_IMAGE
                                : ((await Storage.get(
                                      user.user_follower.profile_pic.s3_key,
                                  )) as string),
                    });
                }
                setFollowers(fetchedUsers);
            }
        }
        fetchFollowers();
    }, [data]);

    function navigateToProfile(userId: number) {
        navigation.push('Profile', { userId });
    }

    return (
        <ScrollView>
            <View style={{ padding: 2, borderRadius: 2, borderColor: 'black' }}>
                {followers.map((result, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigateToProfile(result.userId)}
                        >
                            <FollowItem
                                description={`@${result.username}`}
                                title={`${result.fullName}`}
                                profilePic={result.profPicUrl}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </ScrollView>
    );
};

export default FollowersList;
