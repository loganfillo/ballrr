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
import FollowersListScreen from '../../screens/FollowersListScreen';

export type RootStackParamList = {
    Post: NavigatorScreenParams<PostStackParamList>;
    Tab: NavigatorScreenParams<TabNavigatorParamList>;
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
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
