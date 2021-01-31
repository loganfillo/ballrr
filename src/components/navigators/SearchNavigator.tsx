import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../../screens/SearchScreen';
import ProfileScreen from '../../screens/ProfileScreen';

export type SearchStackParamList = {
    Search: undefined;
    SearchProfile: { userId: number } | undefined;
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
                name="SearchProfile"
                component={ProfileScreen}
                options={{ headerBackTitleVisible: false, headerTitle: 'Profile' }}
            />
        </SearchStack.Navigator>
    );
};

export default SearchNavigator;
