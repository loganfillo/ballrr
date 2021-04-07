import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../../screens/ProfileScreen';
import InboxButton from '../buttons/InboxButton';

export type ProfileStackParamList = {
    Profile: { userId: number } | undefined;
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
        </Stack.Navigator>
    );
};

export default ProfileStackNavigator;
