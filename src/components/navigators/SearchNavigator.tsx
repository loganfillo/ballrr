import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../../screens/SearchScreen';
import ProfileNavigator from './ProfileNavigator';

export type SearchStackParamList = {
    Search: undefined;
    ProfileNavigator: undefined;
};

const SearchStack = createStackNavigator<SearchStackParamList>();

const SearchNavigator: React.FC = () => {
    return (
        <SearchStack.Navigator initialRouteName="Search">
            <SearchStack.Screen
                name="Search"
                component={SearchScreen}
                options={{ headerShown: true }}
            />
            <SearchStack.Screen
                name="ProfileNavigator"
                component={ProfileNavigator}
                options={{ headerShown: false, headerBackTitleVisible: false }}
            />
        </SearchStack.Navigator>
    );
};

export default SearchNavigator;
