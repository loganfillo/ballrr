import React, { useState, useEffect } from 'react';
import { View, TextInput, Dimensions, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Competition, LeaderBoard } from '../lib/types';
import CreatePostInput from '../components/CreatePostInput';

interface Props {
    onCompetitionChange: (comp: Competition) => void;
    isSubmission: boolean;
    subName?: string;
    subDescription?: string;
    subLeaderboardType?: LeaderBoard;
    subTimeLimit?: number;
}
const CreatePostCompSettings: React.FC<Props> = ({
    onCompetitionChange,
    isSubmission,
    subName,
    subDescription,
    subLeaderboardType,
    subTimeLimit,
}: Props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [leaderboardType, setLeaderboardType] = useState<LeaderBoard>(LeaderBoard.LIKES);
    const [timeLimit, setTimeLimit] = useState('');
    const [score, setScore] = useState('');

    const { width } = Dimensions.get('window');

    useEffect(() => {
        const comp: Competition = {
            name,
            description,
            leaderboardType,
            timeLimit: Number.parseInt(timeLimit, 10) || 0,
            score: Number.parseInt(score, 10) || 0,
        };
        onCompetitionChange(comp);
    }, [name, description, timeLimit, score, leaderboardType]);

    useEffect(() => {
        if (isSubmission && subName && subDescription && subLeaderboardType) {
            setName(subName);
            setDescription(subDescription);
            setLeaderboardType(subLeaderboardType);
            if (subLeaderboardType === LeaderBoard.TIMED && subTimeLimit) {
                setTimeLimit(subTimeLimit.toString());
            }
        }
    }, [subName, subDescription, subLeaderboardType, subTimeLimit]);

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
                            value={score}
                            onChangeText={setScore}
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
