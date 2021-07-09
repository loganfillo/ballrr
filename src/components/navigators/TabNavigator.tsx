import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileNavigator, { ProfileStackParamList } from './ProfileNavigator';
import FeedNavigator from './FeedNavigator';
import {
    getFocusedRouteNameFromRoute,
    NavigatorScreenParams,
    RouteProp,
} from '@react-navigation/native';
import CompetitionNavigator from './CompetitionNavigator';
import SearchNavigator, { SearchStackParamList } from './SearchNavigator';
import TabBar from '../TabBar';

export type TabNavigatorParamList = {
    FeedTab: undefined;
    SearchTab: NavigatorScreenParams<SearchStackParamList>;
    PostPlaceholder: undefined;
    CompetitionTab: undefined;
    ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            initialRouteName="FeedTab"
            tabBar={({ navigation, descriptors, state }) => (
                <TabBar navigation={navigation} descriptors={descriptors} state={state} />
            )}
        >
            <Tab.Screen name="FeedTab" component={FeedNavigator} />
            <Tab.Screen name="SearchTab" component={SearchNavigator} />
            <Tab.Screen name="CompetitionTab" component={CompetitionNavigator} />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileNavigator}
                options={({ route }) => ({
                    tabBarVisible: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? '';

                        if (
                            routeName === 'FollowingList' ||
                            routeName === 'FollowersList' ||
                            routeName === 'Notifications'
                        ) {
                            return false;
                        }

                        return true;
                    })(route),
                })}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
