import React, { useState } from 'react';
import CreatePostTab from './CreatePostTab';
import NotificationBadge from './NotificationBadge';
import { View, Animated, Dimensions } from 'react-native';
import { NavigationHelpers, ParamListBase } from '@react-navigation/core';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import TabIcon from './TabIcon';

const HOME_TAB = 'HomeTab';
const SEARCH_TAB = 'SearchTab';
const POST_TAB = 'PostTab';
const CHALLENGES_TAB = 'ChallengesTab';
const PROFILE_TAB = 'ProfileTab';
const TAB_NAMES = [HOME_TAB, SEARCH_TAB, POST_TAB, CHALLENGES_TAB, PROFILE_TAB];

const { width } = Dimensions.get('window');
const TAB_BAR_PERCENT = 85;
const NUMBER_TABS = 5;
const ICON_SIZE = 0.09 * width;
const SCREEN_WIDTH = width;
const TAB_BAR_WIDTH = (TAB_BAR_PERCENT / 100) * SCREEN_WIDTH;
const EDGE_WIDTH = (SCREEN_WIDTH - TAB_BAR_WIDTH) / 2;
const TAB_SPACING = (TAB_BAR_WIDTH - NUMBER_TABS * ICON_SIZE) / (NUMBER_TABS + 1);
const TAB_MARGIN = 3;

interface TabBarProps {
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}

const TabBar: React.FC<TabBarProps> = ({ navigation }: TabBarProps) => {
    const [index, setIndex] = useState(0);
    const { width, height } = Dimensions.get('window');

    const newSpacing = (newIndex: number) =>
        EDGE_WIDTH + (newIndex + 1) * TAB_SPACING + newIndex * ICON_SIZE + TAB_MARGIN;

    const [translateValue] = useState(new Animated.Value(newSpacing(index)));

    function navigate(screen: string) {
        const newIndex = TAB_NAMES.indexOf(screen);
        setIndex(newIndex);
        navigation.navigate(screen);
        Animated.spring(translateValue, {
            toValue: newSpacing(newIndex),
            velocity: 40,
            friction: 100,
            useNativeDriver: true,
        }).start();
    }

    return (
        <>
            <View
                style={{
                    width: `${TAB_BAR_PERCENT}%`,
                    height: 60,
                    backgroundColor: 'white',
                    borderRadius: 100,
                    bottom: 0.025 * height,
                    position: 'absolute',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                }}
            >
                <TabIcon
                    name={'home-outline'}
                    size={ICON_SIZE}
                    onPress={() => navigate(HOME_TAB)}
                />
                <TabIcon name={'magnify'} size={ICON_SIZE} onPress={() => navigate(SEARCH_TAB)} />
                <CreatePostTab size={ICON_SIZE} />
                <TabIcon
                    name={'trophy-outline'}
                    size={ICON_SIZE}
                    onPress={() => navigate(CHALLENGES_TAB)}
                />
                <NotificationBadge
                    icon={
                        <TabIcon
                            name={'account-outline'}
                            size={ICON_SIZE}
                            onPress={() => navigate(PROFILE_TAB)}
                        />
                    }
                    top={0}
                    right={0.015 * width}
                />
            </View>
            <Animated.View
                style={{
                    borderBottomWidth: 2,
                    borderColor: 'black',
                    transform: [{ translateX: translateValue }],
                    bottom: 0.032 * height,
                    width: ICON_SIZE - 2 * TAB_MARGIN,
                    position: 'absolute',
                }}
            />
        </>
    );
};

export default TabBar;
