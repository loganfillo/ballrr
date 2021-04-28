import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../../screens/ProfileScreen';
import InboxButton from '../buttons/InboxButton';
import FollowersListScreen from '../../screens/FollowersListScreen';
import ProfileMenuScreen from '../../screens/ProfileMenuScreen';
import AccountSettingsScreen from '../../screens/AccountSettingsScreen';
import UserPolicyScreen from '../../screens/UserPolicyScreen';
import NotificationScreen from '../../screens/NotificationScreen';
import EditProfileScreen from '../../screens/EditProfileScreen';
import FollowingListScreen from '../../screens/FollowingListScreen';

export type ProfileStackParamList = {
    Profile: { userId: number } | undefined;
    EditProfile: { userId: number } | undefined;
    FollowersList: { userId: number } | undefined;
    FollowingList: { userId: number } | undefined;
    ProfileMenu: { userId: number } | undefined;
    AccountSettings: { userId: number } | undefined;
    UserPolicy: { userId: number } | undefined;
    Notifications: { userId: number } | undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

const RightHeaderButton = () => <InboxButton />;

const ProfileStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerRight: RightHeaderButton }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{
                    title: 'Edit',
                    headerBackTitleVisible: false,
                }}
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
            <Stack.Screen name="ProfileMenu" component={ProfileMenuScreen} />
            <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
            <Stack.Screen name="UserPolicy" component={UserPolicyScreen} />
            <Stack.Screen
                name="Notifications"
                component={NotificationScreen}
                options={{ headerBackTitleVisible: false }}
            />
        </Stack.Navigator>
    );
};

export default ProfileStackNavigator;
