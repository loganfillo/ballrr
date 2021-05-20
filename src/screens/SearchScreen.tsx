import { useApolloClient } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, List, Searchbar } from 'react-native-paper';
import { SEARCH_USERS } from '../lib/queries';
import { SearchResult } from '../lib/types';
import { Storage } from 'aws-amplify';
import { Flag } from '../lib/types';
import flags from '../lib/flags';

const PLACE_HOLDER_IMAGE = 'https://files.thehandbook.com/uploads/2019/03/ronaldo.jpg';

const SearchScreen: React.FC = () => {
    const [results, setResults] = useState<SearchResult[]>([]);
    const [flagList, setFlagList] = useState<Flag[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const apolloClient = useApolloClient();
    const navigation = useNavigation();

    function navigateToProfile(userId: number) {
        navigation.navigate('ProfileNavigator', { screen: 'Profile', params: { userId } });
    }

    function updateSearchQuery(query: string) {
        setSearchQuery(query);
    }

    useEffect(() => {
        async function search() {
            setFlagList(flags.filter((flag) => flag.name == searchQuery));
            if (searchQuery !== '') {
                const res = await apolloClient.query({
                    query: SEARCH_USERS,
                    variables: { search_query: searchQuery.concat('%') },
                });
                const fetchedResults: SearchResult[] = [];
                for (const user of res.data.users) {
                    fetchedResults.push({
                        username: user.username,
                        fullName: user.full_name,
                        userId: user.id,
                        profPicUrl:
                            user.profile_pic === null
                                ? PLACE_HOLDER_IMAGE
                                : ((await Storage.get(user.profile_pic.s3_key)) as string),
                    });
                }

                setResults(fetchedResults);
            } else {
                setResults([]);
            }
        }
        search();
    }, [searchQuery]);

    return (
        <ScrollView>
            <View style={{ padding: 10, borderRadius: 2, borderColor: 'black' }}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={updateSearchQuery}
                    value={searchQuery}
                />
                {flagList.map((result, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() =>
                                navigation.navigate('SearchByNation', { flag: result.name })
                            }
                        >
                            <View
                                style={{
                                    marginTop: 10,
                                    paddingBottom: 10,
                                    borderBottomColor: 'black',
                                    borderBottomWidth: 1,
                                }}
                            >
                                <Text style={{ fontSize: 20, marginLeft: 5 }}>
                                    {result.emoji} {result.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
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

export default SearchScreen;
