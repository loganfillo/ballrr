import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

interface Props {
    onPress: () => void;
}

const PostButton: React.FC<Props> = ({ onPress }: Props) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.postButtonContainer}>
            <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    postButtonContainer: {
        elevation: 8,
        backgroundColor: '#eb6a6a',
        borderRadius: 5,
        padding: 8,
        paddingHorizontal: 15,
        justifyContent: 'flex-end',
        alignSelf: 'flex-start',
        borderColor: 'black',
        borderWidth: 2,
        bottom: 0,
        right: 0,
        position: 'absolute',
    },
    postButtonText: {
        fontSize: 26,
        color: '#000',
        fontWeight: '300',
        alignSelf: 'center',
    },
});

export default PostButton;
