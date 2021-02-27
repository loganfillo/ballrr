import ViewPager from '@react-native-community/viewpager';
import { View } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';
import FeedChallenge from '../components/challenges/FeedChallenge';

const BrowseChallengeScreen: React.FC = () => {
    const challenges = [
        {
            posterUri:
                'https://ussoccerplayers.com/images/2014/02/usmnt-mix-diskerud-dribbling-practice.jpg',
            type: 'Dribbling',
            title: '20 Cone Drill',
            userCount: 200,
        },
        {
            posterUri: 'https://d3j2bju5c7tc02.cloudfront.net/2016_44/Ball_Control.jpg',
            type: 'Passing',
            title: 'Triangle Passing',
            userCount: 200,
        },
        {
            posterUri:
                'https://upl.stack.com/wp-content/uploads/2018/02/09123057/5-Drills-to-Improve-Your-Soccer-Dribbling-Skills-stack.jpg',
            type: 'Shooting',
            title: 'Go Bar Down',
            userCount: 200,
        },
        {
            posterUri:
                'https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Kids/Galleries/4+Drills/Slide-1$!2c2.jpg',
            type: 'Headers',
            title: '25 Headers in a Row',
            userCount: 200,
        },
    ];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ViewPager style={{ flex: 1 }} initialPage={0}>
                {challenges.map((challenge, id) => {
                    return (
                        <View key={id}>
                            <FeedChallenge challenge={challenge} />
                        </View>
                    );
                })}
            </ViewPager>
        </SafeAreaView>
    );
};

export default BrowseChallengeScreen;
