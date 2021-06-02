import React from 'react';
import { Text, View } from 'react-native';
import { Comment } from '../lib/types';

interface Props {
    comment: Comment;
}

const CommentDisplay: React.FC<Props> = ({ comment }: Props) => {
    return (
        <>
            <View>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                    {'@' + comment.commenterUsername}
                </Text>
                <Text style={{ fontSize: 13, color: 'white', fontWeight: 'normal' }}>
                    {comment.comment}
                </Text>
                <Text style={{ fontSize: 13, color: 'white', fontWeight: 'normal' }}>
                    {comment.timestamp}
                </Text>
            </View>
        </>
    );
};

export default CommentDisplay;
