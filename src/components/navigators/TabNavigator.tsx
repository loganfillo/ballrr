import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileStackNavigator, { ProfileStackParamList } from './ProfileNavigator';
import HomeScreen from '../../screens/HomeScreen';
import { AntDesign } from '@expo/vector-icons';
import CreatePostButton from '../buttons/CreatePostButton';
import { getFocusedRouteNameFromRoute, NavigatorScreenParams } from '@react-navigation/native';
import ChallengeNavigator from './ChallengeNavigator';
import SearchNavigator, { SearchStackParamList } from './SearchNavigator';

export type TabNavigatorParamList = {
    Home: undefined;
    Search: NavigatorScreenParams<SearchStackParamList>;
    PostPlaceholder: undefined;
    Challenges: undefined;
    Profile: NavigatorScreenParams<ProfileStackParamList>;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

interface TabBarIconProps {
    color: string;
}

const HomeTab = ({ color }: TabBarIconProps) => <AntDesign name="home" size={24} color={color} />;

const SearchTab = ({ color }: TabBarIconProps) => (
    <AntDesign name="search1" size={24} color={color} />
);

const PostButton = () => <CreatePostButton />;

const ChallengeTab = ({ color }: TabBarIconProps) => (
    <AntDesign name="profile" size={24} color={color} />
);

const ProfileTab = ({ color }: TabBarIconProps) => (
    <AntDesign name="user" size={24} color={color} />
);

const PostScreenPlaceholder: React.FC = () => null;

const tabBarOptions = {
    activeTintColor: 'black',
    inactiveTintColor: 'darkgrey',
    activeBackgroundColor: 'white',
    inactiveBackgroundColor: 'white',
    showIcon: true,
    showLabel: true,
    tabStyle: {
        paddingTop: 5,
        paddingBottom: 5,
    },
};

const TabNavigator: React.FC = () => {
    return (
        <Tab.Navigator initialRouteName="Home" tabBarOptions={tabBarOptions}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: HomeTab,
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchNavigator}
                options={{
                    tabBarIcon: SearchTab,
                }}
            />
            <Tab.Screen
                name="PostPlaceholder"
                component={PostScreenPlaceholder}
                options={{
                    tabBarVisible: false,

                    tabBarButton: PostButton,
                }}
            />
            <Tab.Screen
                name="Challenges"
                component={ChallengeNavigator}
                options={{
                    tabBarIcon: ChallengeTab,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStackNavigator}
                options={({ route }) => ({
                    tabBarIcon: ProfileTab,
                    tabBarVisible: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? '';
                        if (
                            routeName === 'Edit' ||
                            routeName === 'Menu' ||
                            routeName === 'Settings' ||
                            routeName === 'Policy'
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
