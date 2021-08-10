import React, { useState, useEffect } from 'react';
import { Dimensions, Image, View } from 'react-native';
import { LeaderBoard, MediaType, Post } from '../lib/types';
import { Video } from 'expo-av';
import FeedPostIconBar from './FeedPostIconBar';
import FeedPostCaption from './FeedPostCaption';
import FeedPostCompThumnbail from './FeedPostCompThumbnail';
import { GET_POST_COMPETITION } from '../lib/queries';
import { useQuery } from '@apollo/client';
import DeletePostButton from './buttons/DeletePostButton';
import { useUser } from '../lib/user';

interface Props {
    post: Post;
    shouldPlay: boolean;
}

const FeedPost: React.FC<Props> = ({ post, shouldPlay }: Props) => {
    const [compId, setCompId] = useState(0);
    const [compScore, setCompScore] = useState(0);
    const [compType, setCompType] = useState<LeaderBoard>();
    const { width, height } = Dimensions.get('window');
    const user = useUser();

    const { loading, error, data } = useQuery(GET_POST_COMPETITION, {
        variables: { post_id: post.id },
    });

    useEffect(() => {
        async function getCompId() {
            if (!loading && !error) {
                if (data.competition_submission_aggregate.aggregate.count > 0) {
                    const competition_sub = data.competition_submission_aggregate.nodes[0];
                    setCompScore(competition_sub.score);
                    setCompId(competition_sub.competition.id);
                    setCompType(competition_sub.competition.leaderboard_type);
                }
            }
        }
        getCompId();
    }, [data]);
    return (
        <>
            {compId !== 0 && (
                <FeedPostCompThumnbail compId={compId} compScore={compScore} compType={compType} />
            )}
            {user.id == post.userId && <DeletePostButton post={post} />}
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
                <FeedPostCaption
                    username={post.username}
                    caption={post.caption}
                    userId={post.userId}
                />
            </View>
            <View
                style={{
                    position: 'absolute',
                    width: 0.15 * width,
                    height: (1 / 3) * height,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    bottom: 0.11 * height,
                }}
            >
                <FeedPostIconBar compId={compId} post={post} />
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
