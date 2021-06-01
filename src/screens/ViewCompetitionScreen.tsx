import { useQuery } from '@apollo/client';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Alert,
    RefreshControl,
} from 'react-native';
import { CompStackParamList } from '../components/navigators/CompetitionNavigator';
import { GET_COMPETITION } from '../lib/queries';
import { Competition, LeaderBoard } from '../lib/types';
import CreatePostButton from '../components/buttons/CreatePostButton';
import ViewCompCount from '../components/ViewCompCount';
import ViewCompPostArray from '../components/ViewCompPostArray';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ViewCompLeaderboard from '../components/ViewCompLeaderboard';
const wait = (timeout: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};

type ViewCompScreenRouteProp = RouteProp<CompStackParamList, 'ViewCompetition'>;

const BrowseChallengeScreen: React.FC = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [competition, setCompetition] = useState<Competition>();
    const [lbModalVisible, setLbModalVisible] = useState(false);
    const { params } = useRoute<ViewCompScreenRouteProp>();
    const { height } = Dimensions.get('window');
    const navigation = useNavigation();

    const { loading, error, data } = useQuery(GET_COMPETITION, {
        variables: { comp_id: params?.compId },
    });

    const CreatePostHeaderButton = () => (
        <View style={{ paddingRight: 10 }}>
            <CreatePostButton
                icon={'plus-box-multiple'}
                size={0.035 * height}
                iconColor={'orange'}
                compId={params.compId}
            ></CreatePostButton>
        </View>
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: CreatePostHeaderButton,
        });
    }, []);

    useEffect(() => {
        if (!loading && !error) {
            if (data.competitions_by_pk !== null) {
                const comp = data.competitions_by_pk;
                setCompetition({
                    name: comp.name,
                    description: comp.description,
                    score: comp.creator_score,
                    timeLimit: comp.time_limit,
                    leaderboardType: comp.leaderboard_type,
                    id: params.compId,
                });
            }
        }
    }, [data]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);

    return (
        <ScrollView
            style={{ flex: 1 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <ViewCompLeaderboard
                visible={lbModalVisible}
                comp={competition}
                refreshing={refreshing}
                onClose={() => setLbModalVisible(false)}
            />
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 15 }}>
                <TouchableOpacity onPress={() => Alert.alert('Should this go to original post??')}>
                    <Image
                        resizeMode="cover"
                        style={{
                            height: 0.2 * height,
                            borderRadius: 10,
                            width: 0.12 * height,
                        }}
                        source={{
                            uri: params.thumbnailUrl,
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View style={{ paddingRight: 10 }}>
                    <Text style={{ fontSize: 22, fontWeight: '400' }}>{competition?.name}</Text>
                </View>
                <ViewCompCount compId={params.compId} refreshing={refreshing} />
            </View>
            {competition?.leaderboardType === LeaderBoard.TIMED && (
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 10,
                        flexDirection: 'row',
                    }}
                >
                    <MaterialCommunityIcons name={'timer'} size={0.02 * height} color={'#111111'} />
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '400',
                            color: '#111111',
                            paddingHorizontal: 3,
                        }}
                    >
                        {competition.timeLimit}s
                    </Text>
                </View>
            )}
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 5 }}>
                <Text style={{ fontSize: 15, color: 'grey' }}>{competition?.description}</Text>
            </View>
            <View
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                }}
            >
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: 'orange',
                        borderRadius: 10,
                        paddingVertical: 10,
                    }}
                    onPress={() => setLbModalVisible(true)}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            color: 'orange',
                            fontWeight: '400',
                            fontSize: 15,
                        }}
                    >
                        View Leaderboard
                    </Text>
                </TouchableOpacity>
            </View>

            <View>
                <ViewCompPostArray compId={params.compId} refreshing={refreshing} />
            </View>
        </ScrollView>
    );
};

export default BrowseChallengeScreen;
