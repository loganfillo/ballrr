import React, { useEffect, useState } from 'react';
import { SafeAreaView, Modal, TouchableOpacity, Dimensions, View, Text, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Storage } from 'aws-amplify';

import { Competition, LeaderBoard, LeaderBoardItem } from '../lib/types';
import { FlatList } from 'react-native-gesture-handler';
import { GET_COMPETITION_LEADERBOARD } from '../lib/queries';
import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

const PLACE_HOLDER_IMAGE = 'https://files.thehandbook.com/uploads/2019/03/ronaldo.jpg';

interface ModalProps {
    visible: boolean;
    comp: Competition | undefined;
    refreshing: boolean;
    onClose: () => void;
}

const LeaderboardModal: React.FC<ModalProps> = ({
    visible,
    comp,
    refreshing,
    onClose,
}: ModalProps) => {
    const { height } = Dimensions.get('window');
    return (
        <>
            {comp !== undefined ? (
                <Modal visible={visible} transparent>
                    <BlurView intensity={95} style={{ flex: 1 }}>
                        <SafeAreaView style={{ backgroundColor: 'rgba(0,0,0,0.7)', flex: 1 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity onPress={() => onClose()}>
                                        <MaterialCommunityIcons
                                            name={'chevron-left'}
                                            size={0.05 * height}
                                            color={'white'}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 7 }}>
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            color: 'white',
                                            fontSize: 20,
                                        }}
                                    >
                                        Leaderboard
                                    </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <MaterialCommunityIcons
                                        name={
                                            comp.leaderboardType === LeaderBoard.LIKES
                                                ? 'fire'
                                                : 'timer'
                                        }
                                        size={0.025 * height}
                                        color={'white'}
                                    />
                                </View>
                            </View>
                            <View
                                style={{
                                    borderColor: 'white',
                                    borderBottomWidth: 1,
                                    margin: 10,
                                }}
                            />
                            <LeaderboardList
                                refreshing={refreshing}
                                comp={comp}
                                onItemPress={onClose}
                            />
                        </SafeAreaView>
                    </BlurView>
                </Modal>
            ) : (
                <></>
            )}
        </>
    );
};

interface ListProps {
    refreshing: boolean;
    comp: Competition;
    onItemPress: () => void;
}
const LeaderboardList: React.FC<ListProps> = ({ refreshing, comp, onItemPress }: ListProps) => {
    const [items, setItems] = useState<LeaderBoardItem[]>([]);
    const { height } = Dimensions.get('window');
    const navigation = useNavigation();

    const { loading, error, data, refetch } = useQuery(GET_COMPETITION_LEADERBOARD, {
        variables: { comp_id: comp.id },
    });

    useEffect(() => {
        refetch();
    }, [refreshing]);

    useEffect(() => {
        async function getData() {
            if (!loading && !error) {
                if (data.competition_submission !== null) {
                    const newItems: LeaderBoardItem[] = [];
                    for (const d of data.competition_submission) {
                        const item: LeaderBoardItem = {
                            profPicUrl:
                                d.post.post_user_id.profile_pic !== null
                                    ? ((await Storage.get(
                                          d.post.post_user_id.profile_pic.s3_key,
                                      )) as string)
                                    : PLACE_HOLDER_IMAGE,
                            name: d.post.post_user_id.full_name,
                            username: d.post.post_user_id.username,
                            score: d.score,
                            postId: d.post.id,
                        };
                        newItems.push(item);
                    }
                    setItems(newItems);
                }
            }
        }
        getData();
    }, [data]);

    function navigateToCompFeed(listId: number) {
        onItemPress();
        navigation.navigate('FeedNavigator', {
            screen: 'Feed',
            params: { postIds: items.map((item) => item.postId), listId: listId },
        });
    }

    function renderItem({ item, index }: { item: LeaderBoardItem; index: number }) {
        return (
            <TouchableOpacity
                onPress={() => navigateToCompFeed(index)}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    padding: 10,
                }}
            >
                <View style={{ flex: 1 }}>
                    <Image
                        style={{
                            borderRadius: 100,
                            height: 0.04 * height,
                            aspectRatio: 1,
                            alignSelf: 'center',
                        }}
                        source={{ uri: item.profPicUrl }}
                    />
                </View>
                <View style={{ flex: 4 }}>
                    <Text style={{ color: 'lightgrey', fontSize: 20 }}>@{item.username}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: 'center', color: 'lightgrey', fontSize: 20 }}>
                        {item.score}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.postId.toString()}
        />
    );
};

export default LeaderboardModal;
