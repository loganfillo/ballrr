import React from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator, { TabNavigatorParamList } from './TabNavigator';
import PostNavigator, { PostStackParamList } from './PostNavigator';

export type RootStackParamList = {
    Post: NavigatorScreenParams<PostStackParamList>;
    Tab: NavigatorScreenParams<TabNavigatorParamList>;
    // updateAuthState: (arg0: string) => void;
};

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator
                initialRouteName="Tab"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <RootStack.Screen name="Post" component={PostNavigator} />
                <RootStack.Screen name="Tab" component={TabNavigator} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
