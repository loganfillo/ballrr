import React, { useEffect, useState } from 'react';
import { Body, Card, CardItem, Icon, Left, Right, Text, Thumbnail } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import { MediaType, Post } from '../lib/types';
import { Video } from 'expo-av';
import DeletePostButton from '../components/buttons/DeletePostButton';
import { DocumentNode, useApolloClient, useQuery } from '@apollo/client';
import { DELETE_LIKE, HAS_USER_LIKED_POST, LIKE_POST } from '../lib/queries';
import { useUser } from '../lib/user';
import { useNavigation } from '@react-navigation/native';

interface Props {
    post: Post;
    shouldPlay: boolean;
}

const FeedPost: React.FC<Props> = ({ post, shouldPlay }: Props) => {
    const [liked, setLiked] = useState(false);
    const [likeLoading, setLikeLoading] = useState(true);
    const [likeVisible, setLikeVisible] = useState(false);
    const [likeIcon, setLikeIcon] = useState('loading');

    const apolloClient = useApolloClient();
    const navigation = useNavigation();
    const user = useUser();

    const { loading, error, data } = useQuery(HAS_USER_LIKED_POST, {
        variables: { post_id: post.id, user_id: user.id },
    });

    useEffect(() => {
        if (!loading && !error) {
            setLiked(data.post_likes.length > 0);
            setLikeVisible(true);
            setLikeLoading(false);
        }
    }, [data]);

    async function likeAndUnlikePost(isLiked: boolean) {
        let query = null;
        if (isLiked) {
            query = LIKE_POST;
        } else if (!isLiked) {
            query = DELETE_LIKE;
        }
        if (query !== null) {
            setLikeLoading(true);
            setLiked(isLiked);
            await apolloClient.mutate({
                mutation: query as DocumentNode,
                variables: { post_id: post.id, user_id: user.id },
            });
            setLikeLoading(false);
        }
    }

    function navigateToProfile(userId: number) {
        navigation.navigate('Profile', { userId });
    }

    useEffect(() => {
        setLikeIcon(liked ? 'heart' : 'heart-outline');
    }, [liked]);

    return (
        <Card style={{ elevation: 3, height: '100%', flex: 1 }}>
            <TouchableOpacity onPress={() => navigateToProfile(post.userId)}>
                <CardItem header bordered>
                    <Left>
                        <Thumbnail
                            source={{
                                uri: 'https://files.thehandbook.com/uploads/2019/03/ronaldo.jpg',
                            }}
                        />
                        <Body>
                            <Text>
                                {post.fullName === null ? 'John Smith' : post.fullName}
                                {'    '}
                            </Text>
                            <Text note>@{post.username === null ? 'johns56' : post.username}</Text>
                        </Body>
                    </Left>
                </CardItem>
            </TouchableOpacity>
            <CardItem cardBody style={{ flex: 1 }}>
                {post.type === MediaType.IMAGE ? (
                    <Image
                        resizeMode="contain"
                        style={{ height: '100%', flex: 1 }}
                        source={{ uri: post.url }}
                    />
                ) : (
                    <Video
                        source={{
                            uri: post.url,
                        }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="contain"
                        shouldPlay={shouldPlay}
                        positionMillis={0}
                        isLooping
                        style={{ height: '100%', flex: 1 }}
                    />
                )}
            </CardItem>
            <CardItem bordered>
                <Text>{post.caption}</Text>
                <Right>
                    {likeVisible ? (
                        <TouchableOpacity
                            disabled={likeLoading}
                            onPress={() => likeAndUnlikePost(!liked)}
                        >
                            <Icon name={likeIcon} style={{ color: '#ED4A6A' }} />
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
                </Right>
                <Right>
                    <DeletePostButton post={post}></DeletePostButton>
                </Right>
            </CardItem>
        </Card>
    );
};

export default FeedPost;
