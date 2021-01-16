import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../../screens/ProfileScreen';
import EditProfileScreen from '../../screens/EditProfileScreen';
import ProfileMenuScreen from '../../screens/ProfileMenuScreen';
import AccountSettingsScreen from '../../screens/AccountSettingsScreen';
import UserPolicyScreen from '../../screens/UserPolicyScreen';

const Stack = createStackNavigator();

const ProfileStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Edit" component={EditProfileScreen} />
            <Stack.Screen name="Menu" component={ProfileMenuScreen} />
            <Stack.Screen name="Settings" component={AccountSettingsScreen} />
            <Stack.Screen name="Policy" component={UserPolicyScreen} />
        </Stack.Navigator>
    );
};

export default ProfileStackNavigator;
