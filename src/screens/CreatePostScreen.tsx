import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, TextInput, Image, Dimensions, TouchableOpacity, Button } from 'react-native';
import { createPost, createCompetitionPost, createCompetitionSubmissionPost } from '../lib/post';
import { Competition, LeaderBoard, Media } from '../lib/types';
import Loading from '../components/Loading';
import { ApolloClient, NormalizedCacheObject, useApolloClient, useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUser } from '../lib/user';
import { RouteProp } from '@react-navigation/native';
import { PostStackParamList } from '../components/navigators/PostNavigator';
import { Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CreatePostCompSettings from '../components/CreatePostCompSettings';
import CreatePostInput from '../components/CreatePostInput';
import { GET_COMPETITION } from '../lib/queries';

type CreatePostScreenRouteProp = RouteProp<PostStackParamList, 'CreatePost'>;

const CreatePostScreen: React.FC = () => {
    const [caption, setCaption] = useState('');
    const [media, setMedia] = useState<Media>({ cancelled: true });
    const [thumbnail, setThumbnail] = useState<Media>({ cancelled: true });

    const [textInputRef, setTextInputRef] = useState<TextInput | null>();
    const [shareButtonDisable, setShareButtonDisable] = useState(true);
    const [isPrivate, setIsPrivate] = useState(false);
    const [isCommentsDisabled, setIsCommentsDisabled] = useState(false);

    const [isSubmission, setIsSubmission] = useState(false);
    const [competition, setCompetition] = useState<Competition>();
    const [hasCompetition, setHasCompetition] = useState(false);

    const apolloClient = useApolloClient();
    const navigation = useNavigation();
    const user = useUser();
    const { params } = useRoute<CreatePostScreenRouteProp>();
    const { width } = Dimensions.get('window');

    const { loading, error, data } = useQuery(GET_COMPETITION, {
        variables: { comp_id: params.competitionId },
    });

    useEffect(() => {
        if (!loading && !error) {
            if (data.competitions_by_pk !== null) {
                const comp = data.competitions_by_pk;
                setCompetition({
                    name: comp.name,
                    description: comp.description,
                    score: 0,
                    timeLimit: comp.time_limit,
                    leaderboardType: comp.leaderboard_type,
                });
                setIsSubmission(true);
                setHasCompetition(true);
            }
        }
    }, [data]);

    const DoneButton = () => (
        <Button title={'Share'} disabled={shareButtonDisable} onPress={createPostAndReturnHome} />
    );

    useEffect(() => {
        console.log(
            competition !== undefined &&
                competition?.name.length > 0 &&
                competition?.description.length > 0 &&
                (competition.leaderboardType === LeaderBoard.LIKES ||
                    (competition.leaderboardType === LeaderBoard.TIMED &&
                        competition.timeLimit &&
                        competition?.timeLimit > 0 &&
                        competition.score &&
                        competition?.score > 0)),
        );

        if (
            !hasCompetition ||
            (competition !== undefined &&
                competition?.name.length > 0 &&
                competition?.description.length > 0 &&
                (competition.leaderboardType === LeaderBoard.LIKES ||
                    (competition.leaderboardType === LeaderBoard.TIMED &&
                        competition.timeLimit &&
                        competition?.timeLimit > 0 &&
                        competition.score &&
                        competition?.score > 0)))
        ) {
            setShareButtonDisable(false);
        } else {
            setShareButtonDisable(true);
        }
    }, [competition]);

    useEffect(() => {
        if (params.media.file && params.thumbnail.file) {
            setMedia(params.media);
            setThumbnail(params.thumbnail);
        }
    }, [params]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: DoneButton,
        });
    }, [
        shareButtonDisable,
        user,
        media,
        thumbnail,
        caption,
        navigation,
        apolloClient,
        competition,
    ]);

    function onCompetitionChange(comp: Competition) {
        setCompetition(comp);
    }

    function createPostAndReturnHome() {
        if (isSubmission) {
            createCompetitionSubmissionPost(
                user,
                apolloClient as ApolloClient<NormalizedCacheObject>,
                media,
                thumbnail,
                caption,
                params.competitionId,
                competition?.score || 0,
            );
        } else if (hasCompetition && competition) {
            createCompetitionPost(
                user,
                apolloClient as ApolloClient<NormalizedCacheObject>,
                media,
                thumbnail,
                caption,
                competition,
            );
        } else {
            createPost(
                user,
                apolloClient as ApolloClient<NormalizedCacheObject>,
                media,
                thumbnail,
                caption,
            );
        }

        setMedia({ cancelled: true });
        navigation.navigate('Feed');
    }

    return (
        <KeyboardAwareScrollView
            style={{ backgroundColor: 'white' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
        >
            {media.cancelled || loading ? (
                <Loading></Loading>
            ) : (
                <View>
                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            padding: 5,
                            borderColor: 'lightgrey',
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            height: width / 4,
                        }}
                    >
                        <TouchableOpacity
                            style={{ flex: 2, paddingRight: 10 }}
                            onPress={() => textInputRef?.focus()}
                        >
                            <TextInput
                                ref={(input) => setTextInputRef(input)}
                                placeholder="Add caption"
                                onChangeText={(text) => setCaption(text)}
                                defaultValue={caption}
                                multiline={true}
                                maxLength={100}
                                blurOnSubmit={false}
                            ></TextInput>
                        </TouchableOpacity>
                        <View style={{ aspectRatio: 1 }}>
                            <Image
                                style={{ flex: 1, borderRadius: 10 }}
                                source={{
                                    uri: thumbnail.file?.uri,
                                }}
                                resizeMode="cover"
                                blurRadius={1}
                            />
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                        <Text
                            style={{
                                textAlign: 'left',
                                fontSize: 12,
                                alignItems: 'center',
                                fontWeight: '300',
                            }}
                        >
                            Security Settings
                        </Text>
                    </View>
                    <View style={{ paddingHorizontal: 12 }}>
                        <CreatePostInput
                            title={'Set Private'}
                            icon={'lock'}
                            iconColor={'black'}
                            hasSwitch={true}
                            onSwitchChange={setIsPrivate}
                            switchValue={isPrivate}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 12, paddingVertical: 10 }}>
                        <CreatePostInput
                            title={'Disable Comments'}
                            icon={'comment-remove'}
                            iconColor={'black'}
                            hasSwitch={true}
                            onSwitchChange={setIsCommentsDisabled}
                            switchValue={isCommentsDisabled}
                        />
                    </View>
                    <View style={{ borderBottomWidth: 1, borderColor: 'lightgrey' }}></View>
                    <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                        <Text
                            style={{
                                textAlign: 'left',
                                fontSize: 12,
                                alignItems: 'center',
                                fontWeight: '300',
                            }}
                        >
                            Competition Settings
                        </Text>
                    </View>
                    {!isSubmission && (
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                padding: 10,
                                margin: 10,
                                borderWidth: 1,
                                borderColor: hasCompetition ? 'red' : 'orange',
                                borderRadius: 10,
                                justifyContent: 'center',
                                flexDirection: 'row',
                            }}
                            onPress={() => setHasCompetition(!hasCompetition)}
                        >
                            <Text
                                style={{
                                    color: hasCompetition ? 'red' : 'orange',
                                    textAlign: 'center',
                                    fontSize: 15,
                                }}
                            >
                                {hasCompetition ? 'Undo' : 'Create Competition'}
                            </Text>
                        </TouchableOpacity>
                    )}
                    {hasCompetition && (
                        <View
                            style={{
                                padding: 5,
                                backgroundColor: 'whitesmoke',
                                margin: 10,
                                borderRadius: 10,
                            }}
                        >
                            <CreatePostCompSettings
                                onCompetitionChange={onCompetitionChange}
                                isSubmission={isSubmission}
                                subName={competition?.name}
                                subDescription={competition?.description}
                                subLeaderboardType={competition?.leaderboardType}
                                subTimeLimit={competition?.timeLimit}
                            />
                        </View>
                    )}
                </View>
            )}
        </KeyboardAwareScrollView>
    );
};

export default CreatePostScreen;
