import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    Modal,
    Image,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import { DocumentNode, useApolloClient, useQuery, useMutation } from '@apollo/client';
import { Storage } from 'aws-amplify';
import { useUser } from '../../lib/user';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GET_COMMENTS, INSERT_COMMENT } from '../../lib/queries';
import { Comment } from '../../lib/types';
import Moment from 'react-moment';
import 'moment-timezone';

interface Props {
    postId: number;
    size: number;
}

const CommentButton: React.FC<Props> = ({ postId, size }: Props) => {
    const user = useUser();
    const [modalVisible, setModalVisible] = useState(false);
    const { height } = Dimensions.get('window');
    const [comment, setComment] = useState('');
    const [commentPosted, setCommentPosted] = useState(false);
    const [commentSection, setCommentSection] = useState<Comment[]>([]);

    const { loading, error, data, refetch } = useQuery(GET_COMMENTS, {
        variables: { post_id: postId },
    });

    const [insertComment] = useMutation(INSERT_COMMENT, {
        variables: { comment: comment, post_id: postId, user_id: user.id },
    });

    async function afterComment() {
        if (comment != '') {
            insertComment();
            setComment('');
            refetch();
        }
    }

    useEffect(() => {
        async function fetchComments() {
            if (!loading && !error) {
                const fetchedComments: Comment[] = [];
                for (const comment of data.comments) {
                    fetchedComments.push({
                        commenterId: user.id,
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

            <Modal
                visible={modalVisible}
                style={{
                    flex: 1,
                    position: 'absolute',
                    top: 0.05 * height,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    zIndex: 100,
                }}
            >
                <SafeAreaView>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <MaterialCommunityIcons
                                name={'chevron-left'}
                                size={0.075 * height}
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
                    </View>
                    <View style={{ paddingBottom: 10 }}>
                        <ScrollView>
                            {commentSection.map((comment, id) => {
                                return (
                                    <View key={id}>
                                        <View style={{ flexDirection: 'row', padding: 3 }}>
                                            <Image
                                                style={{
                                                    borderRadius: 100,
                                                    height: undefined,
                                                    width: '10%',
                                                    aspectRatio: 1,
                                                    flexDirection: 'row',
                                                }}
                                                source={{
                                                    uri: comment.commenterPicUrl,
                                                }}
                                            />
                                            <View style={{ flexDirection: 'column' }}>
                                                <Text
                                                    style={{
                                                        color: 'black',
                                                        fontSize: 16,
                                                        fontWeight: 'bold',
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        padding: 2,
                                                    }}
                                                >
                                                    {'@' + comment.commenterUsername}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        color: 'black',
                                                        fontWeight: 'normal',
                                                        paddingLeft: 20,
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
                                                fontSize: 12,
                                                color: 'black',
                                                fontWeight: 'normal',
                                                alignSelf: 'flex-end',
                                            }}
                                        >
                                            {comment.timestamp}
                                        </Moment>
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </View>
                </SafeAreaView>
                <KeyboardAvoidingView
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <TextInput
                        style={{
                            borderColor: 'black',
                            borderWidth: 3,
                            padding: 10,
                            flex: 1,
                            fontSize: 16,
                        }}
                        maxLength={200}
                        onChangeText={(text) => setComment(text)}
                        value={comment}
                        autoFocus={true}
                        returnKeyType="send"
                        onSubmitEditing={() => afterComment()}
                    />
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
};

export default CommentButton;
