import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ViewPager from '@react-native-community/viewpager';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Left,
    List,
    ListItem,
    Right,
    Text,
    Thumbnail,
} from 'native-base';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
interface Challenge {
    posterUri: string;
    type: string;
    title: string;
    userCount: number;
}

interface Props {
    challenge: Challenge;
}

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

const SaveChallengeButton: React.FC<Props> = ({ challenge }: Props) => {
    const [saved, setSaved] = useState(false);
    function saveChallenge() {
        if (saved) {
            setSaved(false);
            // Do something to remove challenge from saved challenges
        } else {
            setSaved(true);
            savedChallenges.push(challenge);
        }
    }
    return (
        <TouchableOpacity onPress={saveChallenge}>
            {saved ? (
                <FontAwesome style={styles.saveButton} name="bookmark" color="gray" size={20} />
            ) : (
                <FontAwesome5 style={styles.saveButton} name="bookmark" color="gray" size={20} />
            )}
        </TouchableOpacity>
    );
};
const FeedChallenge: React.FC<Props> = ({ challenge }: Props) => {
    return (
        <Card style={{ flex: 1 }}>
            <CardItem cardBody style={{ flex: 1 }}>
                <Image
                    resizeMode="cover"
                    style={{ height: '100%', flex: 1 }}
                    source={{ uri: challenge.posterUri }}
                />
            </CardItem>
            <CardItem bordered>
                <Left>
                    <Text>{challenge.title}</Text>
                    <Text note>{challenge.type}</Text>
                </Left>
                <Right>
                    <FontAwesome5
                        style={styles.sendButton}
                        name="share"
                        light
                        color="green"
                        size={18}
                    />
                </Right>
            </CardItem>
            <CardItem footer>
                <Left>
                    <FontAwesome5
                        style={styles.userCount}
                        name="users"
                        light
                        color="black"
                        size={15}
                    />
                    <Text>{challenge.userCount}</Text>
                </Left>
                <Right>
                    <SaveChallengeButton challenge={challenge} />
                </Right>
            </CardItem>
        </Card>
    );
};

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

const renderItem = ({ item }: { item: Challenge }) => {
    return (
        <ListItem avatar>
            <Left>
                <FontAwesome5
                    style={styles.userCount}
                    name="trophy"
                    light
                    color="green"
                    size={15}
                />
            </Left>
            <Body>
                <Text>{item.title}</Text>
                <Text note>{item.type}</Text>
            </Body>
            <Right>
                <FontAwesome5 style={styles.userCount} name="users" light color="black" size={10} />
            </Right>
            <Right>
                <Text>{item.userCount}</Text>
            </Right>
            <Right>
                {/* <Button transparent>
                    <Text>Do</Text>
                </Button> */}
            </Right>
        </ListItem>
    );
};

const SavedChallengeScreen: React.FC = () => {
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

const Tab = createMaterialTopTabNavigator();

const ChallengeNavigator: React.FC = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator
                swipeEnabled={false}
                tabBarOptions={{
                    indicatorStyle: { backgroundColor: 'green' },
                }}
            >
                <Tab.Screen name="Browse" component={BrowseChallengeScreen} />
                <Tab.Screen name="Saved" component={SavedChallengeScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sendButton: {
        padding: 10,
        borderWidth: 2,
        borderColor: 'green',
        borderRadius: 22,
    },
    saveButton: {},
    userCount: {
        // padding: 5,
        fontWeight: 'bold',
    },
});
export default ChallengeNavigator;
