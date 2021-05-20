import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../../screens/SearchScreen';
import ProfileNavigator from './ProfileNavigator';
import SearchByNationScreen from '../../screens/SearchByNationScreen';
import { Flag } from '../../lib/types';

export type SearchStackParamList = {
    Search: undefined;
    ProfileNavigator: undefined;
    SearchByNation: { flag: string };
};

const SearchStack = createStackNavigator<SearchStackParamList>();

const SearchNavigator: React.FC = () => {
    return (
        <SearchStack.Navigator initialRouteName="Search">
            <SearchStack.Screen
                name="Search"
                component={SearchScreen}
                options={{ headerShown: false }}
            />
            <SearchStack.Screen
                name="ProfileNavigator"
                component={ProfileNavigator}
                options={{ headerShown: false, headerBackTitleVisible: false }}
            />
            <SearchStack.Screen
                name="SearchByNation"
                component={SearchByNationScreen}
                options={{ headerShown: true, headerBackTitleVisible: true }}
            />
        </SearchStack.Navigator>
    );
};

export default SearchNavigator;
