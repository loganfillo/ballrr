import React from 'react';
import { Body, Container, Left, List, ListItem, Right, Text } from 'native-base';
import { SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Challenge } from '../lib/types';

const renderItem = ({ item }: { item: Challenge }) => {
    return (
        <ListItem avatar>
            <Left>
                <FontAwesome5 name="trophy" light color="green" size={15} />
            </Left>
            <Body>
                <Text>{item.title}</Text>
                <Text note>{item.type}</Text>
            </Body>
            <Right>
                <FontAwesome5 name="users" light color="black" size={10} />
            </Right>
            <Right>
                <Text>{item.userCount}</Text>
            </Right>
        </ListItem>
    );
};
const SavedChallengeScreen: React.FC = () => {
    const savedChallenges: Challenge[] = [
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
            <Container>
                <List
                    dataArray={savedChallenges}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.type}
                />
            </Container>
        </SafeAreaView>
    );
};

export default SavedChallengeScreen;
