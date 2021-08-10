import React, { useEffect, useState, useCallback } from 'react';
import {
    TouchableOpacity,
    Modal,
    Image,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
    RefreshControl,
} from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { Storage } from 'aws-amplify';
import { useUser } from '../../lib/user';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'native-base';
import { GET_COMMENTS, INSERT_COMMENT } from '../../lib/queries';
import { Comment } from '../../lib/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Moment from 'react-moment';
import 'moment-timezone';

interface Props {
    postId: number;
    size: number;
}

const wait = (timeout: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};

const CommentButton: React.FC<Props> = ({ postId, size }: Props) => {
    const user = useUser();
    const [modalVisible, setModalVisible] = useState(false);
    const { height } = Dimensions.get('window');
    const [refreshing, setRefreshing] = useState(false);
    const [comment, setComment] = useState('');
    const [commentSection, setCommentSection] = useState<Comment[]>([]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navigation = useNavigation<StackNavigationProp<any>>();

    const { loading, error, data, refetch } = useQuery(GET_COMMENTS, {
        variables: { post_id: postId },
        fetchPolicy: 'cache-and-network',
    });

    const [insertComment] = useMutation(INSERT_COMMENT, {
        variables: { comment: comment, post_id: postId, user_id: user.id },
    });

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        wait(1000).then(() => setRefreshing(false));
    }, []);

    async function afterComment() {
        if (comment != '') {
            insertComment();
            setComment('');
            refetch();
        }
    }

    function navigateToProfile(userId: number) {
        setModalVisible(false);
        navigation.navigate('Profile', { screen: 'Profile', params: { userId } });
    }

    useEffect(() => {
        async function fetchComments() {
            if (!loading && !error) {
                const fetchedComments: Comment[] = [];
                for (const comment of data.comments) {
                    fetchedComments.push({
                        commenterId: comment.commenter.id,
                        comment: comment.comment,
                        timestamp: comment.created_at,
                        commenterPicUrl:
                            comment.commenter.profile_pic == null
                                ? 'https://www.macmillandictionary.com/external/slideshow/full/Grey_full.png'
                                : ((await Storage.get(
                                      comment.commenter.profile_pic.s3_key,
                                  )) as string),
                        commenterUsername: comment.commenter.username,
                        postId: comment.post_id,
                    });
                }
                setCommentSection(fetchedComments);
            }
        }
        fetchComments();
    }, [data]);

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <MaterialCommunityIcons name={'comment'} size={size} color={'white'} />
            </TouchableOpacity>

            <Modal visible={modalVisible}>
                <SafeAreaView style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={{ paddingVertical: 5 }}
                    >
                        <MaterialCommunityIcons
                            name={'chevron-left'}
                            size={0.05 * height}
                            color={'black'}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 20,
                            fontWeight: 'bold',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            padding: 5,
                        }}
                    >
                        Comments
                    </Text>
                </SafeAreaView>
                <ScrollView
                    style={{ paddingBottom: 50 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {commentSection.map((comment, id) => {
                        return (
                            <View key={id}>
                                <View style={{ borderBottomWidth: 2, borderColor: 'whitesmoke' }} />
                                <View key={id} style={{ padding: 8, backgroundColor: 'white' }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => navigateToProfile(comment.commenterId)}
                                            style={{ flex: 1 }}
                                        >
                                            <Image
                                                style={{
                                                    borderRadius: 100,
                                                    height: undefined,
                                                    width: '100%',
                                                    aspectRatio: 1,
                                                    flexDirection: 'row',
                                                }}
                                                source={{
                                                    uri: comment.commenterPicUrl,
                                                }}
                                            />
                                        </TouchableOpacity>
                                        <View
                                            style={{
                                                flexDirection: 'column',
                                                paddingLeft: 8,
                                                flex: 8,
                                            }}
                                        >
                                            <TouchableOpacity
                                                onPress={() =>
                                                    navigateToProfile(comment.commenterId)
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        color: 'black',
                                                        fontSize: 14,
                                                        fontWeight: 'bold',
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {'@' + comment.commenterUsername}
                                                </Text>
                                            </TouchableOpacity>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    color: 'black',
                                                    fontWeight: 'normal',
                                                }}
                                            >
                                                {comment.comment}
                                            </Text>
                                        </View>
                                    </View>
                                    <Moment
                                        element={Text}
                                        fromNow
                                        style={{
                                            fontSize: 10,
                                            color: 'black',
                                            fontWeight: 'normal',
                                            alignSelf: 'flex-end',
                                            paddingRight: 10,
                                        }}
                                    >
                                        {comment.timestamp}
                                    </Moment>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
                <KeyboardAvoidingView behavior="padding" style={{}}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View
                            style={{
                                justifyContent: 'flex-end',
                                backgroundColor: 'whitesmoke',
                                borderRadius: 100,
                                padding: 15,
                                marginHorizontal: 5,
                                marginBottom: 10,
                            }}
                        >
                            <TextInput
                                style={{
                                    borderColor: 'black',
                                    borderBottomWidth: 1,
                                    padding: 5,
                                    fontSize: 16,
                                    borderRadius: 10,
                                }}
                                placeholder="Enter comment here..."
                                maxLength={200}
                                onChangeText={(text) => setComment(text)}
                                value={comment}
                                autoFocus={true}
                                returnKeyType="send"
                                onSubmitEditing={() => afterComment()}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
};

export default CommentButton;
