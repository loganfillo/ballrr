import React, { useState, useEffect } from 'react';
import { View, TextInput, Dimensions, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Competition, LeaderBoard } from '../lib/types';
import CreatePostInput from '../components/CreatePostInput';

interface Props {
    onCompetitionChange: (comp: Competition) => void;
    isSubmission: boolean;
    competition: Competition | undefined;
}
const CreatePostCompSettings: React.FC<Props> = ({
    onCompetitionChange,
    isSubmission,
    competition,
}: Props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [leaderboardType, setLeaderboardType] = useState<LeaderBoard>(LeaderBoard.LIKES);
    const [timeLimit, setTimeLimit] = useState('');
    const [creatorScore, setCreatorScore] = useState('');

    const { width } = Dimensions.get('window');

    useEffect(() => {
        if (!isSubmission) {
            const comp: Competition = {
                name,
                description,
                leaderboardType,
                timeLimit: Number.parseInt(timeLimit, 10) || 0,
                creatorScore: Number.parseInt(creatorScore, 10) || 0,
            };
            onCompetitionChange(comp);
        }
    }, [name, description, timeLimit, creatorScore, leaderboardType]);

    useEffect(() => {
        if (competition !== undefined && isSubmission) {
            setName(competition.name);
            setDescription(competition.description);
            setLeaderboardType(competition.leaderboardType);
            if (
                competition.leaderboardType === LeaderBoard.TIMED &&
                competition.timeLimit &&
                competition.creatorScore
            ) {
                setTimeLimit(competition.timeLimit.toString());
                setCreatorScore(competition.creatorScore.toString());
            }
        }
    }, [competition]);

    function capitalizeFirstLetter(s: string): string {
        return s && s[0].toUpperCase() + s.slice(1);
    }

    return (
        <>
            <View style={{ padding: 10 }}>
                <View style={{ paddingBottom: 12 }}>
                    <CreatePostInput title={'Name'} icon={'trophy'} iconColor={'orange'} />
                </View>
                <TextInput
                    editable={!isSubmission}
                    value={name}
                    onChangeText={setName}
                    placeholder="Add name"
                ></TextInput>
                <View style={{ paddingVertical: 12 }}>
                    <CreatePostInput title={'Description'} icon={'text-box'} iconColor={'orange'} />
                </View>
                <TextInput
                    editable={!isSubmission}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Add Description"
                ></TextInput>
                <View style={{ paddingVertical: 12 }}>
                    <View>
                        <CreatePostInput
                            title={'Leaderboard Type'}
                            icon={'poll'}
                            iconColor={'orange'}
                            hasButton={true}
                            button={
                                <View style={{ paddingLeft: 5 }}>
                                    <MaterialCommunityIcons
                                        name={'help-circle-outline'}
                                        size={0.05 * width}
                                        color={'darkgrey'}
                                    />
                                </View>
                            }
                        />
                    </View>
                </View>
                <View
                    pointerEvents={isSubmission ? 'none' : 'auto'}
                    style={{
                        flexDirection: 'row',
                        flex: 1,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: 'orange',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor:
                                leaderboardType === LeaderBoard.LIKES ? 'orange' : 'transparent',
                            borderRadius: 10,
                        }}
                    >
                        <Button
                            color={leaderboardType === LeaderBoard.LIKES ? 'white' : 'orange'}
                            title={capitalizeFirstLetter(LeaderBoard.LIKES)}
                            onPress={() => setLeaderboardType(LeaderBoard.LIKES)}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            borderRadius: 10,
                            backgroundColor:
                                leaderboardType === LeaderBoard.TIMED ? 'orange' : 'transparent',
                        }}
                    >
                        <Button
                            color={leaderboardType === LeaderBoard.TIMED ? 'white' : 'orange'}
                            title={capitalizeFirstLetter(LeaderBoard.TIMED)}
                            onPress={() => setLeaderboardType(LeaderBoard.TIMED)}
                        />
                    </View>
                </View>
                {leaderboardType === LeaderBoard.TIMED && (
                    <>
                        <View style={{ paddingVertical: 12 }}>
                            <CreatePostInput
                                title={'Time Limit'}
                                icon={'timer'}
                                iconColor={'orange'}
                            />
                        </View>
                        <TextInput
                            editable={!isSubmission}
                            value={timeLimit}
                            onChangeText={setTimeLimit}
                            placeholder="Enter time limit (s)"
                            keyboardType="number-pad"
                        />
                        <View style={{ paddingVertical: 10 }}>
                            <CreatePostInput
                                title={'Your Score'}
                                icon={'numeric'}
                                iconColor={'orange'}
                            />
                        </View>
                        <TextInput
                            editable={!isSubmission}
                            value={creatorScore}
                            onChangeText={setCreatorScore}
                            placeholder="Enter score"
                            keyboardType="number-pad"
                        />
                    </>
                )}
            </View>
        </>
    );
};

export default CreatePostCompSettings;
