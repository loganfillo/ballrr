import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TextInput, Image } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { createPost } from '../lib/post';
import { Media } from '../lib/types';
import Loading from '../components/Loading';
import { ApolloClient, NormalizedCacheObject, useApolloClient } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import PostButton from '../components/buttons/PostButton';
import AddChallengeButton from '../components/buttons/AddChallengeButton';
import ChallengeOthersButton from '../components/buttons/ChallengeOthersButton';
import { useUser } from '../lib/user';
import { RouteProp } from '@react-navigation/native';
import { PostStackParamList } from '../components/navigators/PostNavigator';

type CreatePostScreenRouteProp = RouteProp<PostStackParamList, 'CreatePost'>;

const CreatePostScreen: React.FC = () => {
    const [caption, setCaption] = useState('');
    const [media, setMedia] = useState<Media>({ cancelled: true });
    const [thumbnailUri, setThumbnailUri] = useState('');

    const apolloClient = useApolloClient();
    const navigation = useNavigation();
    const user = useUser();
    const { params } = useRoute<CreatePostScreenRouteProp>();

    useEffect(() => {
        setMedia(params.media);
        if (params.thumbnail.file) {
            setThumbnailUri(params.thumbnail.file.uri);
        }
    }, [params]);

    function createPostAndReturnHome(
        apolloClient: ApolloClient<NormalizedCacheObject>,
        media: Media,
        caption: string,
    ) {
        createPost(user, apolloClient, media, caption);
        setMedia({ cancelled: true });
        navigation.navigate('Home');
    }

    return (
        <View style={styles.container}>
            {media.cancelled ? (
                <Loading></Loading>
            ) : (
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                    }}
                >
                    <View style={{ justifyContent: 'flex-start', flex: 1 }}>
                        <Grid>
                            <Row style={styles.contentPreviewRow}>
                                <Col>
                                    <View style={styles.caption}>
                                        <TextInput
                                            placeholder="Add caption"
                                            onChangeText={(text) => setCaption(text)}
                                            defaultValue={caption}
                                            multiline={true}
                                        ></TextInput>
                                    </View>
                                </Col>

                                <Col style={styles.contentPreviewColumn}>
                                    <View>
                                        <Image
                                            style={styles.contentPreview}
                                            source={{
                                                uri: thumbnailUri,
                                            }}
                                            resizeMode="cover"
                                            blurRadius={3}
                                        />
                                    </View>
                                </Col>
                            </Row>
                            <Row style={{ padding: 8 }} />
                            <Row>
                                <Col style={{ flex: 0.4 }} />
                                <Col style={{ flex: 0.6 }}>
                                    <AddChallengeButton />
                                </Col>
                            </Row>
                            <Row style={{ padding: 8 }} />
                            <Row>
                                <Col style={{ flex: 0.4 }} />
                                <Col style={{ flex: 0.6 }}>
                                    <ChallengeOthersButton />
                                </Col>
                            </Row>
                            <Row>
                                <Col></Col>

                                <Col></Col>
                            </Row>
                        </Grid>
                    </View>
                    <View style={{ justifyContent: 'flex-end', flex: 10 }}>
                        <Grid>
                            <Row style={{ justifyContent: 'flex-start' }}></Row>
                            <Row style={{ justifyContent: 'space-between' }}>
                                <PostButton
                                    onPress={() =>
                                        createPostAndReturnHome(
                                            apolloClient as ApolloClient<NormalizedCacheObject>,
                                            media,
                                            caption,
                                        )
                                    }
                                ></PostButton>
                            </Row>
                        </Grid>
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
    },
    contentPreviewColumn: {
        width: 100,
        alignContent: 'flex-end',
    },
    contentPreview: {
        height: 100,
        width: 100,
        alignContent: 'flex-end',
    },
    caption: {
        alignContent: 'flex-start',
        alignSelf: 'flex-start',
        paddingRight: 8,
    },
    contentPreviewRow: {
        borderTopColor: 'black',
        borderTopWidth: 2,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        paddingBottom: 1,
        paddingTop: 1,
    },
    newPostText: {
        fontSize: 20,
        paddingBottom: 10,
        alignItems: 'center',
        textAlign: 'center',
        flex: 1,
    },
});

export default CreatePostScreen;
