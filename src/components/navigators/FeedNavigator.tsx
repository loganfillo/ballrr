import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import FeedScreen from '../../screens/FeedScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import { useUser } from '../../lib/user';
import InboxButton from '../buttons/InboxButton';

export type FeedStackParamList = {
    Home: undefined;
    Profile: { userId: number } | undefined;
};

const FeedStack = createStackNavigator<FeedStackParamList>();

const RightHeaderButton = () => <InboxButton />;

const FeedNavigator: React.FC = () => {
    const user = useUser();
    return (
        <FeedStack.Navigator initialRouteName="Home">
            <FeedStack.Screen name="Home" component={FeedScreen} options={{ headerShown: false }} />
            <FeedStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={({ route }) =>
                    ({
                        headerRight: route.params?.userId == user.id ? RightHeaderButton : null,
                        headerBackTitleVisible: false,
                    } as StackNavigationOptions)
                }
            />
        </FeedStack.Navigator>
    );
};

export default FeedNavigator;
