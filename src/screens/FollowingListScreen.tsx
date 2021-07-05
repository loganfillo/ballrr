import { useQuery } from '@apollo/client';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, List } from 'react-native-paper';
import { GET_FOLLOWING } from '../lib/queries';
import { Following } from '../lib/types';
import { Storage } from 'aws-amplify';
import { useUser } from '../lib/user';
import { ProfileStackParamList } from '../components/navigators/ProfileNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

const PLACE_HOLDER_IMAGE = 'https://files.thehandbook.com/uploads/2019/03/ronaldo.jpg';

type FollowingRouteProp = RouteProp<ProfileStackParamList, 'FollowingList'>;

const FollowingList: React.FC = () => {
    const [following, setFollowing] = useState<Following[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navigation = useNavigation<StackNavigationProp<any>>();
    const { params } = useRoute<FollowingRouteProp>();
    const user = useUser();
    const profileUserId = params !== undefined ? params.userId : user.id;

    const { loading, error, data } = useQuery(GET_FOLLOWING, {
        variables: {
            user_id: profileUserId,
        },
    });

    useEffect(() => {
        async function fetchFollowing() {
            if (!loading && !error) {
                const fetchedUsers: Following[] = [];

                for (const user of data.followers) {
                    fetchedUsers.push({
                        username: user.user_followed.username,
                        fullName: user.user_followed.full_name,
                        userId: user.user_followed.id,
                        profPicUrl:
                            user.user_followed.profile_pic === null
                                ? PLACE_HOLDER_IMAGE
                                : ((await Storage.get(
                                      user.user_followed.profile_pic.s3_key,
                                  )) as string),
                    });
                }
                setFollowing(fetchedUsers);
            }
        }
        fetchFollowing();
    }, [data]);

    function navigateToProfile(userId: number) {
        navigation.push('Profile', { userId });
    }

    return (
        <ScrollView>
            <View style={{ padding: 2, borderRadius: 2, borderColor: 'black' }}>
                {following.map((result, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigateToProfile(result.userId)}
                        >
                            <List.Item
                                description={`@${result.username}`}
                                title={`${result.fullName}`}
                                left={() => (
                                    <Avatar.Image
                                        size={46}
                                        source={{
                                            uri: result.profPicUrl,
                                        }}
                                    />
                                )}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </ScrollView>
    );
};

export default FollowingList;
