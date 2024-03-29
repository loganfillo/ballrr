import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import ProfileScreen from '../../screens/ProfileScreen';
import InboxButton from '../buttons/InboxButton';
import { useUser } from '../../lib/user';
import FeedNavigator from './FeedNavigator';
import NotificationScreen from '../../screens/NotificationScreen';
import FollowersListScreen from '../../screens/FollowersListScreen';
import FollowingListScreen from '../../screens/FollowingListScreen';

export type ProfileStackParamList = {
    Profile: { userId: number } | undefined;
    FeedNavigator: undefined;
    Notifications: undefined;
    FollowersList: { userId: number } | undefined;
    FollowingList: { userId: number } | undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

const RightHeaderButton = () => <InboxButton />;

const ProfileNavigator: React.FC = () => {
    const user = useUser();
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen
                name="Profile"
                initialParams={{ userId: user.id }}
                component={ProfileScreen}
                options={({ route }) =>
                    ({
                        headerRight: route.params?.userId === user.id ? RightHeaderButton : null,
                        headerBackTitleVisible: false,
                    } as StackNavigationOptions)
                }
            />
            <Stack.Screen
                name="FeedNavigator"
                component={FeedNavigator}
                options={{
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    gestureResponseDistance: { horizontal: 200 },
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Notifications"
                component={NotificationScreen}
                options={{ headerBackTitleVisible: false }}
            />
            <Stack.Screen
                name="FollowersList"
                component={FollowersListScreen}
                options={{
                    title: 'Followers',
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="FollowingList"
                component={FollowingListScreen}
                options={{
                    title: 'Following',
                    headerBackTitleVisible: false,
                }}
            />
        </Stack.Navigator>
    );
};

export default ProfileNavigator;
