import React, { useState } from 'react';
import { Post } from '../lib/types';
import LikeButton from './buttons/LikeButton';
import CommentButton from './buttons/CommentButton';
import LikeCount from './LikeCount';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import CreatePostButton from './buttons/CreatePostButton';

interface Props {
    post: Post;
    compId: number;
}

const FeedPostIconBar: React.FC<Props> = ({ post, compId }: Props) => {
    const [likeChanged, setLikeChanged] = useState(false);
    const { width } = Dimensions.get('window');
    const ICON_SIZE = 0.1 * width;

    function changeLike() {
        setLikeChanged(!likeChanged);
    }

    return (
        <>
            <LikeButton postId={post.id} size={ICON_SIZE} onChange={changeLike} />
            <LikeCount postId={post.id} likeChanged={likeChanged} />
            {compId !== 0 && (
                <CreatePostButton
                    icon={'plus-box-multiple'}
                    size={ICON_SIZE}
                    iconColor={'orange'}
                    compId={compId}
                ></CreatePostButton>
            )}
            <CommentButton postId={post.id} size={ICON_SIZE} />
            <MaterialCommunityIcons name={'send'} size={ICON_SIZE} color={'white'} />
        </>
    );
};

export default FeedPostIconBar;
