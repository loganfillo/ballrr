import { Card, CardItem, Left, Right, Text } from 'native-base';
import React, { Fragment, useState } from 'react';
import { ScrollView, View, Button, Modal, StyleSheet, Image } from 'react-native';
import { Challenge } from '../../lib/types';
import SaveChallengeButton from './SaveChallengeButton';
import LeaderBoard from './ChallengeLeaderboard';
import { FontAwesome5 } from '@expo/vector-icons';

interface Props {
    challenge: Challenge;
}

const FeedChallenge: React.FC<Props> = ({ challenge }: Props) => {
    const [ModalOpen, setModalOpen] = useState(false);
    return (
        <Fragment>
            <Modal animationType="slide" visible={ModalOpen}>
                <ScrollView>
                    <View style={{ position: 'absolute', top: 20, left: 20 }}>
                        <Button title="X" onPress={() => setModalOpen(false)} />
                    </View>
                    <LeaderBoard challenge={challenge} />
                </ScrollView>
            </Modal>
            <Card style={{ flex: 1 }}>
                <CardItem cardBody style={{ flex: 1 }} onPress={() => setModalOpen(true)}>
                    <Image
                        resizeMode="cover"
                        style={{ height: '100%', flex: 1, width: '100%' }}
                        source={{ uri: challenge.posterUri }}
                    />
                </CardItem>
                <CardItem bordered>
                    <Left>
                        <Text onPress={() => setModalOpen(true)}>{challenge.title}</Text>
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
        </Fragment>
    );
};

const styles = StyleSheet.create({
    sendButton: {
        padding: 10,
        borderWidth: 2,
        borderColor: 'green',
        borderRadius: 22,
    },
    userCount: {
        fontWeight: 'bold',
    },
});

export default FeedChallenge;
