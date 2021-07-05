import React from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator, { TabNavigatorParamList } from './TabNavigator';
import PostNavigator, { PostStackParamList } from './PostNavigator';
import EditProfileScreen from '../../screens/EditProfileScreen';
import ProfileMenuScreen from '../../screens/ProfileMenuScreen';
import AccountSettingsScreen from '../../screens/AccountSettingsScreen';
import UserPolicyScreen from '../../screens/UserPolicyScreen';
import NotificationScreen from '../../screens/NotificationScreen';
// import FollowersListScreen from '../../screens/FollowersListScreen';
// import FollowingListScreen from '../../screens/FollowingListScreen';

export type RootStackParamList = {
    Post: NavigatorScreenParams<PostStackParamList>;
    Tab: NavigatorScreenParams<TabNavigatorParamList>;
    EditProfile: undefined;
    ProfileMenu: undefined;
    UserPolicy: undefined;
    AccountSettings: undefined;
    Notifications: undefined;
    // FollowersList: { userId: number } | undefined;
    // FollowingList: { userId: number } | undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator initialRouteName="Tab">
                <RootStack.Screen
                    name="Post"
                    options={{ headerShown: false }}
                    component={PostNavigator}
                />
                <RootStack.Screen
                    name="Tab"
                    options={{ headerShown: false }}
                    component={TabNavigator}
                />
                <RootStack.Screen
                    name="EditProfile"
                    component={EditProfileScreen}
                    options={{
                        title: 'Edit',
                        headerBackTitleVisible: false,
                    }}
                />
                <RootStack.Screen name="ProfileMenu" component={ProfileMenuScreen} />
                <RootStack.Screen
                    name="AccountSettings"
                    component={AccountSettingsScreen}
                    options={{
                        title: 'Account Settings',
                        headerBackTitleVisible: false,
                    }}
                />
                <RootStack.Screen name="UserPolicy" component={UserPolicyScreen} />
                <RootStack.Screen
                    name="Notifications"
                    component={NotificationScreen}
                    options={{ headerBackTitleVisible: false }}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
