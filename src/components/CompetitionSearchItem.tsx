/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import { Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import { LeaderBoard } from '../lib/types';
import { useQuery } from '@apollo/client';
import { GET_COMPETITION_THUMBNAIL } from '../lib/queries';
import { Storage } from 'aws-amplify';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ViewCompCount from './ViewCompCount';
import { useNavigation } from '@react-navigation/native';

interface Props {
    name: string;
    type: LeaderBoard
    compId: number
}
const CompetitionSearchItem: React.FC<Props> = ({ name, type, compId}: Props) => {
    const {width, height} = Dimensions.get("window")
    const [url, setUrl] = useState("https://images-na.ssl-images-amazon.com/images/I/11Pl7si+xBL._SX331_BO1,204,203,200_.jpg");

    const { loading, error, data } = useQuery(GET_COMPETITION_THUMBNAIL, {
        variables: { comp_id: compId },
    });
    
    const navigation = useNavigation();

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
        navigation.navigate('ViewCompetition', { compId, thumbnailUrl: url } );
    }

    return (
        <TouchableOpacity
            onPress={() => navigateToCompetition()}
            style={{backgroundColor: "whitesmoke", width: width/2-10, height: height/3, borderRadius: 20, borderWidth: 1.5, borderColor: 'orange'}}
        >
            <Image
                resizeMode="cover"
                style={{
                    height: '100%',
                    flex: 1,
                    borderRadius: 20,
                }}
                source={{
                    uri: url,
                }}
            />
            <View style={{ position: "absolute", bottom: 8,left: 5, paddingHorizontal:5}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{                       
                        backgroundColor: 'orange',
                        borderRadius: 100,
                        padding: 5,
                        justifyContent: 'center',
                        marginRight: 5}}>
                        <MaterialCommunityIcons
                            name={type === LeaderBoard.LIKES ? 'fire' : 'timer'}
                            size={0.025 * height}
                            color={'white'}
                        />
                    </View>
                        <View style={{                      
                            backgroundColor: 'orange',
                            borderRadius: 100,
                            padding: 5,
                            justifyContent: 'center',
                            }}>
                            <ViewCompCount compId={compId} color={'white'}refreshing={false}/>
                        </View>
                    </View>
                <Text style={{color: "white", fontSize: 18, fontWeight: 'bold'}}>
                    {name}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
export default CompetitionSearchItem;
