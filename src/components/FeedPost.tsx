import React, { useState } from 'react';
import { Body, Card, CardItem, Icon, Left, Right, Text } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import { MediaType, Post } from '../lib/types';
import { Video } from 'expo-av';

interface Props {
    post: Post;
    shouldPlay: boolean;
}

const FeedPost: React.FC<Props> = ({ post, shouldPlay }: Props) => {
    const [liked, setLiked] = useState(false);

    const likeIcon = liked ? 'heart' : 'heart-outline';

    return (
        <Card style={{ elevation: 3, height: '100%', flex: 1 }}>
            <CardItem header bordered>
                <Left>
                    <Icon name="football"></Icon>
                    <Body>
                        <Text>
                            {post.fullName === null ? 'John Smith' : post.fullName}
                            {'    '}
                            <Text note>@{post.username === null ? 'johns56' : post.username}</Text>
                        </Text>
                    </Body>
                </Left>
            </CardItem>
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
                    <TouchableOpacity onPress={() => setLiked(!liked)}>
                        <Icon name={likeIcon} style={{ color: '#ED4A6A' }} />
                    </TouchableOpacity>
                </Right>
            </CardItem>
        </Card>
    );
};

export default FeedPost;
