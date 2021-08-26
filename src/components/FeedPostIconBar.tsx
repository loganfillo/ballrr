import React, { useState } from 'react';
import { Post } from '../lib/types';
import LikeButton from './buttons/LikeButton';
import CommentButton from './buttons/CommentButton';
import LikeCount from './LikeCount';
import CommentCount from './CommentCount';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import CreatePostButton from './buttons/CreatePostButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SendPostModal } from './SendPostModal';
import { useUser } from '../lib/user';

interface Props {
    post: Post;
    compId: number;
}

const FeedPostIconBar: React.FC<Props> = ({ post, compId }: Props) => {
    const [likeChanged, setLikeChanged] = useState(false);
    const [sendCompModalVisible, setSendCompModalVisible] = useState(false);
    const { width } = Dimensions.get('window');
    const user = useUser();
    const ICON_SIZE = 0.085 * width;

    function changeLike() {
        setLikeChanged(!likeChanged);
    }

    return (
        <>
            <SendPostModal
                visible={sendCompModalVisible}
                onClose={() => setSendCompModalVisible(false)}
                profileUserId={user.id}
                postId={post.id}
            />
            {compId !== 0 && (
                <CreatePostButton
                    icon={'plus-box-multiple'}
                    size={ICON_SIZE}
                    iconColor={'orange'}
                    compId={compId}
                ></CreatePostButton>
            )}
            <LikeButton postId={post.id} size={ICON_SIZE} onChange={changeLike} compId={compId} />
            <LikeCount postId={post.id} likeChanged={likeChanged} />
            <CommentButton postId={post.id} size={ICON_SIZE} />
            <CommentCount postId={post.id}></CommentCount>
            <TouchableOpacity onPress={() => setSendCompModalVisible(true)}>
                <MaterialCommunityIcons name={'send'} size={ICON_SIZE} color={'white'} />
            </TouchableOpacity>
        </>
    );
};

export default FeedPostIconBar;
