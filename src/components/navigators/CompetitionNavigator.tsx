import React from 'react';
import ViewCompetitionScreen from '../../screens/ViewCompetitionScreen';
import SearchCompetitionScreen from '../../screens/SearchCompetitionScreen';
import { createStackNavigator } from '@react-navigation/stack';
import FeedNavigator from './FeedNavigator';

export type CompStackParamList = {
    ViewCompetition: { compId: number; thumbnailUrl: string };
    FeedNavigator: undefined;
    SearchCompetitions: undefined;
};

const CompStack = createStackNavigator<CompStackParamList>();

const CompetitionNavigator: React.FC = () => {
    return (
        <CompStack.Navigator
            screenOptions={{
                headerStyle: { shadowOpacity: 0 },
            }}
        >
            <CompStack.Screen
                name="SearchCompetitions"
                component={SearchCompetitionScreen}
                options={{
                    headerTitle: 'Competitions',
                    headerBackTitleVisible: false,
                }}
            />
            <CompStack.Screen
                name="FeedNavigator"
                component={FeedNavigator}
                options={{
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    gestureResponseDistance: { horizontal: 200 },
                    headerShown: false,
                }}
            />
            <CompStack.Screen
                name="ViewCompetition"
                component={ViewCompetitionScreen}
                options={{
                    headerTitle: 'Competition',
                    headerBackTitleVisible: false,
                }}
            />
        </CompStack.Navigator>
    );
};

export default CompetitionNavigator;
