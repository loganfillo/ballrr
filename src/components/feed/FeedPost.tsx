import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { MediaType, Post } from '../../lib/types';
import { Video } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import FeedPostIconBar from './FeedPostIconBar';
import FeedPostHeader from './FeedPostHeader';
import FeedPostCaption from './FeedPostCaption';

interface Props {
    post: Post;
    shouldPlay: boolean;
}

const FeedPost: React.FC<Props> = ({ post, shouldPlay }: Props) => {
    const { width, height } = Dimensions.get('window');

    return (
        <>
            <SafeAreaView
                style={{
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                    flex: 1,
                    alignItems: 'center',
                }}
            >
                <FeedPostHeader post={post} />
            </SafeAreaView>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0.1 * height,
                    width: '75%',
                    alignSelf: 'center',
                    justifyContent: 'space-evenly',
                    alignItems: 'flex-start',
                }}
            >
                <FeedPostCaption username={post.username} caption={post.caption} />
            </View>
            <View
                style={{
                    position: 'absolute',
                    width: 0.14 * width,
                    height: 0.4 * height,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    bottom: 0.1 * height,
                }}
            >
                <FeedPostIconBar post={post} />
            </View>
            <View style={{ width: '100%', height: '100%', zIndex: -1, position: 'absolute' }}>
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
                        resizeMode="cover"
                        shouldPlay={shouldPlay}
                        positionMillis={0}
                        isLooping
                        style={{ height: '100%', width: '100%', flex: 1 }}
                    />
                )}
            </View>
        </>
    );
};

export default FeedPost;
