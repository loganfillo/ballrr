import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InboxButton from '../components/profile/InboxButton';
import { useUser } from '../lib/user';

export type SearchStackParamList = {
    Search: undefined;
    Profile: { userId: number } | undefined;
};

const SearchStack = createStackNavigator<SearchStackParamList>();

const RightHeaderButton = () => <InboxButton />;

const SearchNavigator: React.FC = () => {
    const user = useUser();

    return (
        <SearchStack.Navigator initialRouteName="Search">
            <SearchStack.Screen
                name="Search"
                component={SearchScreen}
                options={{ headerShown: false }}
            />
            <SearchStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={({ route }) =>
                    ({
                        headerRight: route.params?.userId == user.id ? RightHeaderButton : null,
                        headerBackTitleVisible: false,
                    } as StackNavigationOptions)
                }
            />
        </SearchStack.Navigator>
    );
};

export default SearchNavigator;
