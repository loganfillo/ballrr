import React, { useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { DocumentNode, useApolloClient, useQuery } from '@apollo/client';
import { DELETE_LIKE, HAS_USER_LIKED_POST, LIKE_POST } from '../../lib/queries';
import { useUser } from '../../lib/user';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
    postId: number;
    onChange: () => void;
}

const LikeButton: React.FC<Props> = ({ postId, onChange }: Props) => {
    const [liked, setLiked] = useState(false);
    const [likeLoading, setLikeLoading] = useState(true);
    const [likeVisible, setLikeVisible] = useState(false);
    const [likeColor, setLikeColor] = useState('transparent');

    const apolloClient = useApolloClient();
    const user = useUser();
    const { width } = Dimensions.get('window');

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
            setLikeLoading(false);
        }
        onChange();
    }
    return (
        <>
            {likeVisible ? (
                <TouchableOpacity disabled={likeLoading} onPress={() => likeAndUnlikePost(!liked)}>
                    <MaterialCommunityIcons name={'fire'} size={0.14 * width} color={likeColor} />
                </TouchableOpacity>
            ) : (
                <></>
            )}
        </>
    );
};

export default LikeButton;
