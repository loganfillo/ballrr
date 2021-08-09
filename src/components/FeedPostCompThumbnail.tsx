import React, { useEffect, useState } from 'react';
import { Image, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Storage } from 'aws-amplify';
import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { GET_COMPETITION_THUMBNAIL } from '../lib/queries';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LeaderBoard } from '../lib/types';

interface Props {
    compId: number;
    compScore: number;
    compType: LeaderBoard | undefined;
}
const FeedPostCompThumnbail: React.FC<Props> = ({ compId, compScore, compType }: Props) => {
    const [url, setUrl] = useState(
        'https://images-na.ssl-images-amazon.com/images/I/11Pl7si+xBL._SX331_BO1,204,203,200_.jpg',
    );

    const navigation = useNavigation();
    const { height } = Dimensions.get('window');

    const { loading, error, data } = useQuery(GET_COMPETITION_THUMBNAIL, {
        variables: { comp_id: compId },
    });

    useEffect(() => {
        async function getCompThumpnail() {
            if (!loading && !error) {
                const competition = data.competitions_by_pk;
                setUrl((await Storage.get(competition.post.thumbnail.s3_key)) as string);
            }
        }
        getCompThumpnail();
    }, [data]);

    function navigateToCompetition() {
        navigation.navigate('Competition', {
            screen: 'ViewCompetition',
            params: { compId, thumbnailUrl: url },
        });
    }

    return (
        <>
            {url.length > 0 && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0.05 * height,
                        left: 0.01 * height,
                        width: '25%',
                        height: '20%',
                    }}
                >
                    <TouchableOpacity onPress={navigateToCompetition} style={{ flex: 1 }}>
                        <Image
                            resizeMode="cover"
                            style={{
                                height: '100%',
                                flex: 1,
                                borderRadius: 10,
                                borderColor: 'orange',
                                borderWidth: 1,
                            }}
                            source={{
                                uri: url,
                            }}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                alignSelf: 'flex-end',
                                bottom: '4%',
                                right: '5%',
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: 'orange',
                                    borderRadius: 100,
                                    padding: 5,
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                }}
                            >
                                <View style={{ justifyContent: 'center' }}>
                                    <MaterialCommunityIcons
                                        name={compType === LeaderBoard.LIKES ? 'fire' : 'timer'}
                                        size={0.02 * height}
                                        color={'white'}
                                    />
                                </View>
                                <Text
                                    style={{
                                        paddingHorizontal: 5,
                                        color: 'white',
                                        textAlign: 'center',
                                        fontSize: 0.018 * height,
                                    }}
                                >
                                    {compScore}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
};

export default FeedPostCompThumnbail;
