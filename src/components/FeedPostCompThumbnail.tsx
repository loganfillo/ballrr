import React, { useEffect, useState } from 'react';
import { Image, View, Dimensions, TouchableOpacity } from 'react-native';
import { Storage } from 'aws-amplify';
import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { GET_COMPETITION_THUMBNAIL } from '../lib/queries';

interface Props {
    compId: number;
}
const FeedPostCompThumnbail: React.FC<Props> = ({ compId }: Props) => {
    const [url, setUrl] = useState('');

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
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
};

export default FeedPostCompThumnbail;
