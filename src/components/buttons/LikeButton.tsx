import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { DocumentNode, useApolloClient, useQuery } from '@apollo/client';
import {
    DELETE_LIKE,
    HAS_USER_LIKED_POST,
    LIKE_POST,
    UPDATE_COMP_SUB_SCORE_LIKES,
} from '../../lib/queries';
import { useUser } from '../../lib/user';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
    postId: number;
    size: number;
    onChange: () => void;
    compId: number;
}

const LikeButton: React.FC<Props> = ({ postId, size, onChange, compId }: Props) => {
    const [liked, setLiked] = useState(false);
    const [likeLoading, setLikeLoading] = useState(true);
    const [likeVisible, setLikeVisible] = useState(false);
    const [likeColor, setLikeColor] = useState('transparent');

    const apolloClient = useApolloClient();
    const user = useUser();

    const { loading, error, data } = useQuery(HAS_USER_LIKED_POST, {
        variables: { post_id: postId, user_id: user.id },
    });

    useEffect(() => {
        if (!loading && !error) {
            setLiked(data.post_likes.length > 0);
            setLikeVisible(true);
            setLikeLoading(false);
        }
    }, [data]);

    useEffect(() => {
        setLikeColor(liked ? 'orangered' : 'white');
    }, [liked]);

    async function likeAndUnlikePost(isLiked: boolean) {
        setLikeLoading(true);
        let query = null;
        if (isLiked) {
            query = LIKE_POST;
        } else if (!isLiked) {
            query = DELETE_LIKE;
        }
        if (query !== null) {
            setLiked(isLiked);
            await apolloClient.mutate({
                mutation: query as DocumentNode,
                variables: { post_id: postId, user_id: user.id },
            });
        }
        if (compId > 0) {
            if (isLiked) {
                await apolloClient.mutate({
                    mutation: UPDATE_COMP_SUB_SCORE_LIKES,
                    variables: { post_id: postId, comp_id: compId, val: 1 },
                });
            } else if (!isLiked) {
                await apolloClient.mutate({
                    mutation: UPDATE_COMP_SUB_SCORE_LIKES,
                    variables: { post_id: postId, comp_id: compId, val: -1 },
                });
            }
        }
        setLikeLoading(false);
        onChange();
    }
    return (
        <>
            {likeVisible ? (
                <TouchableOpacity disabled={likeLoading} onPress={() => likeAndUnlikePost(!liked)}>
                    <MaterialCommunityIcons name={'fire'} size={size} color={likeColor} />
                </TouchableOpacity>
            ) : (
                <></>
            )}
        </>
    );
};

export default LikeButton;
