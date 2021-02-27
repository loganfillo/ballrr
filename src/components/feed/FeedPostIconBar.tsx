import React, { useState } from 'react';
import { Post } from '../../lib/types';
import LikeButton from './LikeButton';
import LikeCount from './LikeCount';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions, View } from 'react-native';

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
            <View style={{ paddingVertical: 10 }}>
                <MaterialCommunityIcons
                    name={'plus-box-multiple'}
                    size={ICON_SIZE}
                    color={'white'}
                />
            </View>
            <View style={{ paddingVertical: 10 }}>
                <MaterialCommunityIcons name={'comment'} size={ICON_SIZE} color={'white'} />
            </View>
            <View style={{ paddingVertical: 10 }}>
                <MaterialCommunityIcons name={'send'} size={ICON_SIZE} color={'white'} />
            </View>
        </>
    );
};

export default FeedPostIconBar;
