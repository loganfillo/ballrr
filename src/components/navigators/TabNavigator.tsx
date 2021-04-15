import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileNavigator, { ProfileStackParamList } from './ProfileNavigator';
import FeedNavigator from './FeedNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';
import ChallengeNavigator from './ChallengeNavigator';
import SearchNavigator, { SearchStackParamList } from './SearchNavigator';
import TabBar from '../TabBar';

export type TabNavigatorParamList = {
    FeedTab: undefined;
    SearchTab: NavigatorScreenParams<SearchStackParamList>;
    PostPlaceholder: undefined;
    ChallengesTab: undefined;
    ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            initialRouteName="FeedTab"
            tabBar={({ navigation }) => <TabBar navigation={navigation} />}
        >
            <Tab.Screen name="FeedTab" component={FeedNavigator} />
            <Tab.Screen name="SearchTab" component={SearchNavigator} />
            <Tab.Screen name="ChallengesTab" component={ChallengeNavigator} />
            <Tab.Screen name="ProfileTab" component={ProfileNavigator} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
