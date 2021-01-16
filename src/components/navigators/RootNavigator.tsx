import React from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator, { TabNavigatorParamList } from './TabNavigator';
import PostNavigator, { PostStackParamList } from './PostNavigator';

export type IndexStackParamList = {
    Post: NavigatorScreenParams<PostStackParamList>;
    Tab: NavigatorScreenParams<TabNavigatorParamList>;
};

const IndexStack = createStackNavigator<IndexStackParamList>();

const RootNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <IndexStack.Navigator
                initialRouteName="Tab"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <IndexStack.Screen name="Post" component={PostNavigator} />
                <IndexStack.Screen name="Tab" component={TabNavigator} />
            </IndexStack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
