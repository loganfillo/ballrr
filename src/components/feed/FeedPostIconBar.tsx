import React, { useState } from 'react';
import { Post } from '../../lib/types';
import LikeButton from './LikeButton';
import LikeCount from './LikeCount';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

interface Props {
    post: Post;
}

const FeedPostIconBar: React.FC<Props> = ({ post }: Props) => {
    const [likeChanged, setLikeChanged] = useState(false);
    const { width } = Dimensions.get('window');
    const ICON_SIZE = 0.1 * width;

    function changeLike() {
        setLikeChanged(!likeChanged);
    }

    return (
        <>
            <LikeButton postId={post.id} onChange={changeLike} />
            <LikeCount postId={post.id} likeChanged={likeChanged} />
            <MaterialCommunityIcons name={'plus-box-multiple'} size={ICON_SIZE} color={'white'} />
            <MaterialCommunityIcons name={'comment'} size={ICON_SIZE} color={'white'} />
            <MaterialCommunityIcons name={'send'} size={ICON_SIZE} color={'white'} />
        </>
    );
};

export default FeedPostIconBar;
