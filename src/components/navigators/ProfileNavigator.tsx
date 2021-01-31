import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../../screens/ProfileScreen';
import EditProfileScreen from '../../screens/EditProfileScreen';
import ProfileMenuScreen from '../../screens/ProfileMenuScreen';
import AccountSettingsScreen from '../../screens/AccountSettingsScreen';
import UserPolicyScreen from '../../screens/UserPolicyScreen';
import { IconButton } from 'react-native-paper';
import NotificationBadge from '../NotificationBadge';
import NotificationScreen from '../../screens/NotificationScreen';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

const InboxButton = ({}) => {
    const navigation = useNavigation();
    return (
        <NotificationBadge
            icon={
                <IconButton
                    color="black"
                    icon="inbox"
                    size={25}
                    onPress={() => navigation.navigate('Notifications')}
                />
            }
            top={6}
            right={8}
        />
    );
};

const ProfileStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerRight: InboxButton }}
            />
            <Stack.Screen name="Edit" component={EditProfileScreen} />
            <Stack.Screen name="Menu" component={ProfileMenuScreen} />
            <Stack.Screen name="Settings" component={AccountSettingsScreen} />
            <Stack.Screen name="Policy" component={UserPolicyScreen} />
            <Stack.Screen
                name="Notifications"
                component={NotificationScreen}
                options={{ headerBackTitleVisible: false }}
            />
        </Stack.Navigator>
    );
};

export default ProfileStackNavigator;
