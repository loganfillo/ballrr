/* eslint-disable prettier/prettier */
import { useApolloClient } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, List } from 'react-native-paper';
import { SEARCH_USERS } from '../lib/queries';
import { SearchResult } from '../lib/types';
import { Storage } from 'aws-amplify';
import SearchBar from '../components/SearchBar';
import SearchItem from '../components/SearchItem';
import HardCodedSearchScreen from '../components/HardCodedSearch';

const PLACE_HOLDER_IMAGE = 'https://files.thehandbook.com/uploads/2019/03/ronaldo.jpg';

const SearchScreen: React.FC = () => {
    const [results, setResults] = useState<SearchResult[]>([]);
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
        <SafeAreaView>
            <View style={{ padding: 2, borderRadius: 2, borderColor: 'black' }}>
                <SearchBar
                    placeholder="Search"
                    onChangeText={updateSearchQuery}
                    value={searchQuery}
                    autoCapitalize="none"
                    leftIcon="search"
                    color='#44B244'
                />
                <ScrollView style={{ paddingBottom: 500}}>
                { searchQuery !== '' ? (
                results.map((result, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigateToProfile(result.userId)}
                        >
                            <SearchItem
                                description={`@${result.username}`}
                                title={`${result.fullName}`}
                                profilePic={result.profPicUrl}
                            />
                        </TouchableOpacity>
                    );
                })) : ( 
//                         <HardCodedSearchScreen/>
                        <></>
                )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default SearchScreen;
