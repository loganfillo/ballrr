import { TouchableOpacity, Alert, Dimensions, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { DELETE_POST } from '../../lib/queries';
import { useMutation } from '@apollo/client';
import { deleteFromS3 } from '../../lib/media';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Post } from '../../lib/types';

interface Props {
    post: Post;
}

const DELETE = 'Delete Post';
const CANCEL = 'Cancel';

const BUTTONS = [DELETE, CANCEL];

const DeletePostButton: React.FC<Props> = ({ post }: Props) => {
    const [confirmDelete, setConfirmDelete] = useState<boolean>();
    const [clicked, setClicked] = useState<string>();
    const { height } = Dimensions.get('window');
    const { showActionSheetWithOptions } = useActionSheet();
    const [deletePost] = useMutation(DELETE_POST, {
        variables: { id: post.id },
    });

    useEffect(() => {
        async function handleActionButton() {
            if (clicked === DELETE) {
                Alert.alert(
                    'Delete Post?',
                    'This action cannot be undone',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => setConfirmDelete(false),
                            style: 'cancel',
                        },
                        { text: 'Delete', onPress: () => setConfirmDelete(true) },
                    ],
                    { cancelable: false },
                );
            }
            setClicked('');
        }
        handleActionButton();
    }, [clicked]);

    useEffect(() => {
        if (confirmDelete) {
            deletePost();
            deleteFromS3(post.thumbnailS3Key);
            deleteFromS3(post.s3Key);

            Alert.alert('Post Deleted');
        }
    }, [confirmDelete]);

    return (
        <>
            <SafeAreaView
                style={{
                    position: 'absolute',
                    top: 0.05 * height,
                    right: 0.01 * height,
                    width: '7%',
                    height: '5%',
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        showActionSheetWithOptions(
                            {
                                destructiveColor: 'red',
                                options: BUTTONS,
                                cancelButtonIndex: BUTTONS.length,
                            },
                            (buttonIndex) => {
                                setClicked(BUTTONS[buttonIndex]);
                            },
                        );
                    }}
                    style={{
                        flex: 1,
                    }}
                >
                    <Ionicons name="ellipsis-vertical" size={30} color="white" />
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
};

export default DeletePostButton;
