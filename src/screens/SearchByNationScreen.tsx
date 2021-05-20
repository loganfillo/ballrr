import { useApolloClient, useQuery } from '@apollo/client';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, List } from 'react-native-paper';
import { SEARCH_USERS_BY_NATION } from '../lib/queries';
import { SearchResult } from '../lib/types';
import { SearchStackParamList } from '../components/navigators/SearchNavigator';

const PLACE_HOLDER_IMAGE = 'https://files.thehandbook.com/uploads/2019/03/ronaldo.jpg';

type SearchByNationRouteProp = RouteProp<SearchStackParamList, 'SearchByNation'>;

const SearchByNationScreen: React.FC = () => {
    const [results, setResults] = useState<SearchResult[]>([]);
    const navigation = useNavigation();
    const { params } = useRoute<SearchByNationRouteProp>();
    const nation = JSON.stringify(params.flag);

    function navigateToProfile(userId: number) {
        navigation.navigate('ProfileNavigator', { screen: 'Profile', params: { userId } });
    }

    const { data } = useQuery(SEARCH_USERS_BY_NATION, {
        variables: { flag: nation },
    });

    useEffect(() => {
        console.log('ELLO');
        const fetchedResults: SearchResult[] = [];
        for (const user of data.users) {
            fetchedResults.push({
                username: user.username,
                fullName: user.full_name,
                userId: user.id,
                profPicUrl: user.profile_pic.s3_key,
            });
        }

        setResults(fetchedResults);
    }, [results]);

    return (
        <ScrollView>
            <View style={{ padding: 10, borderRadius: 2, borderColor: 'black' }}>
                {results.map((result, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigateToProfile(result.userId)}
                        >
                            <List.Item
                                description={`@${result.username}`}
                                title={`${result.fullName}`}
                                left={() => (
                                    <Avatar.Image
                                        size={46}
                                        source={{
                                            uri: result.profPicUrl,
                                        }}
                                    />
                                )}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </ScrollView>
    );
};

export default SearchByNationScreen;
