import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native';
import SavedChallengeScreen from '../../screens/SavedChallengesScreen';
import BrowseChallengeScreen from '../../screens/BrowseChallengeScreen';

const Tab = createMaterialTopTabNavigator();

const ChallengeNavigator: React.FC = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator
                swipeEnabled={false}
                tabBarOptions={{
                    indicatorStyle: { backgroundColor: 'green' },
                }}
            >
                <Tab.Screen name="Browse" component={BrowseChallengeScreen} />
                <Tab.Screen name="Saved" component={SavedChallengeScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

export default ChallengeNavigator;
