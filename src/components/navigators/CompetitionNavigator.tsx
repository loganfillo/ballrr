import React from 'react';
import ViewCompetitionScreen from '../../screens/ViewCompetitionScreen';
import { createStackNavigator } from '@react-navigation/stack';

export type CompStackParamList = {
    ViewCompetition: { compId: number; thumbnailUrl: string };
    SearchCompetitions: undefined;
};

const CompStack = createStackNavigator<CompStackParamList>();

const ChallengeNavigator: React.FC = () => {
    return (
        <CompStack.Navigator
            screenOptions={{
                headerStyle: { shadowOpacity: 0 },
            }}
        >
            <CompStack.Screen
                name="SearchCompetitions"
                component={() => {
                    <></>;
                }}
                options={{
                    headerTitle: 'Competition',
                    headerBackTitleVisible: false,
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

export default ChallengeNavigator;
