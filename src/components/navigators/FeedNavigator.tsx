import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FeedScreen from '../../screens/FeedScreen';

export type FeedStackParamList = {
    Feed: { userId: number; listId: number } | undefined;
};

const FeedStack = createStackNavigator<FeedStackParamList>();

const FeedNavigator: React.FC = () => {
    return (
        <FeedStack.Navigator initialRouteName="Feed">
            <FeedStack.Screen
                name="Feed"
                component={FeedScreen}
                options={{ headerShown: false }}
                initialParams={{ listId: 0 }}
            />
        </FeedStack.Navigator>
    );
};

export default FeedNavigator;
