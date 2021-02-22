import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';

export type HomeStackParamList = {
    Home: undefined;
    Profile: { userId: number } | undefined;
};

const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeFeedNavigator: React.FC = () => {
    return (
        <HomeStack.Navigator initialRouteName="Home">
            <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <HomeStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerBackTitleVisible: false, headerTitle: 'Profile' }}
            />
        </HomeStack.Navigator>
    );
};

export default HomeFeedNavigator;
