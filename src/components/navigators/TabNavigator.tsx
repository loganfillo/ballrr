import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileStackNavigator, { ProfileStackParamList } from './ProfileNavigator';
import HomeScreen from '../../screens/HomeScreen';
import { AntDesign } from '@expo/vector-icons';
import SearchScreen from '../../screens/SearchScreen';
import CreatePostButton from '../buttons/CreatePostButton';
import { getFocusedRouteNameFromRoute, NavigatorScreenParams } from '@react-navigation/native';
import ChallengeNavigator from './ChallengeNavigator';
import SearchNavigator, { SearchStackParamList } from './SearchNavigator';
import { IconButton } from 'react-native-paper';
import NotificationBadge from '../NotificationBadge';

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

const HomeTab = ({ color }: TabBarIconProps) => (
    <IconButton color={color} icon="home" size={30} style={{}} />
);

const SearchTab = ({ color }: TabBarIconProps) => (
    <IconButton color={color} icon="magnify" size={30} style={{}} />
);

const PostButton = () => <CreatePostButton />;

const ChallengeTab = ({ color }: TabBarIconProps) => (
    <IconButton color={color} icon="trophy" size={28} style={{}} />
);

const ProfileTab = ({ color }: TabBarIconProps) => (
    <NotificationBadge
        icon={<IconButton color={color} icon="account" size={36} style={{}} />}
        top={12}
        right={14}
    />
);

const PostScreenPlaceholder: React.FC = () => null;

const tabBarOptions = {
    activeTintColor: 'black',
    inactiveTintColor: 'darkgrey',
    activeBackgroundColor: 'white',
    inactiveBackgroundColor: 'white',
    showIcon: true,
    showLabel: false,
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
