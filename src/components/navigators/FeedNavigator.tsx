import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FeedScreen from '../../screens/FeedScreen';
import CompetitionNavigator from './CompetitionNavigator';
import ProfileNavigator from './ProfileNavigator';

export type FeedStackParamList = {
    Feed: { postIds: number[]; listId: number } | undefined;
    Profile: undefined;
    Competition: undefined;
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
            <FeedStack.Screen
                name="Competition"
                component={CompetitionNavigator}
                options={{ headerShown: false }}
            />
            <FeedStack.Screen
                name="Profile"
                component={ProfileNavigator}
                options={{ headerShown: false, headerBackTitleVisible: false }}
            />
        </FeedStack.Navigator>
    );
};

export default FeedNavigator;
