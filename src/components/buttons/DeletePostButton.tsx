import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { DELETE_POST } from '../../lib/queries';
import { useMutation } from '@apollo/client';
import { deleteFromS3 } from '../../lib/delete';
import { Post } from '../../lib/types';

interface Props {
    post: Post;
}

const DeletePostButton: React.FC<Props> = ({ post }: Props) => {
    const [confirmDelete, setConfirmDelete] = useState<boolean>();
    const [addTodo, { data }] = useMutation(DELETE_POST, {
        variables: { id: post.id },
    });

    useEffect(() => {
        if (confirmDelete) {
            addTodo();
            deleteFromS3(post.s3_key);
            Alert.alert('Post Deleted');
        }
    }, [confirmDelete]);

    return (
        <TouchableOpacity
            onPress={() => {
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
            }}
            style={styles.button}
        >
            <Ionicons name="md-trash-sharp" size={20} color="black" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: { flex: 1, backgroundColor: 'white' },
    button: {
        flex: 1,
        backgroundColor: 'white',
        padding: 2,
        marginLeft: 1,
        marginRight: 1,
    },
    iconContainer: { justifyContent: 'center', alignSelf: 'center', flex: 1 },
});

export default DeletePostButton;
