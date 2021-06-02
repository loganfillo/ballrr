import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    Modal,
    Button,
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
import { CommentDisplay } from '../../components/CommentDisplay';

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

    function afterComment() {
        setCommentPosted(true);
        setComment('');
    }

    useEffect(() => {
        if (commentPosted) {
            insertComment();
            setCommentPosted(false);
            refetch();
        }

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
    }, [data, commentPosted]);

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
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <MaterialCommunityIcons
                            name={'chevron-left'}
                            size={0.075 * height}
                            color={'black'}
                        />
                    </TouchableOpacity>
                    <View style={{}}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 14,
                                textAlign: 'center',
                            }}
                        >
                            Put Comment Here
                        </Text>
                        <ScrollView>
                            <Text
                                style={{
                                    color: 'black',
                                    fontSize: 14,
                                    textAlign: 'center',
                                }}
                            >
                                In Scrollview
                            </Text>
                            {commentSection.map((comment, id) => {
                                return (
                                    <View key={id}>
                                        <Text
                                            style={{
                                                color: 'black',
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {'@' + comment.commenterUsername}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: 'black',
                                                fontWeight: 'normal',
                                            }}
                                        >
                                            {comment.comment}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: 'black',
                                                fontWeight: 'normal',
                                            }}
                                        >
                                            {comment.timestamp}
                                        </Text>
                                    </View>
                                );
                            })}
                            {/* {commentSection.map((comment, id) => {
                                return (
                                    <View key={id}>
                                        <CommentDisplay commentInfo={comment} key={id} />
                                    </View>
                                );
                            })} */}
                        </ScrollView>
                        <KeyboardAvoidingView
                            style={{ flexDirection: 'row', justifyContent: 'flex-end', bottom: 0 }}
                        >
                            <TextInput
                                style={{
                                    borderColor: 'green',
                                    borderWidth: 1,
                                    padding: 4,
                                    flex: 1,
                                }}
                                maxLength={200}
                                onChangeText={(text) => setComment(text)}
                                value={comment}
                                autoFocus={true}
                                returnKeyType="send"
                                onSubmitEditing={afterComment}
                            />
                        </KeyboardAvoidingView>
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    );
};

export default CommentButton;
