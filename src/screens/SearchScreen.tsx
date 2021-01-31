import { useApolloClient } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, List, Searchbar } from 'react-native-paper';
import { SEARCH_USERS } from '../lib/queries';
import { SearchResult } from '../lib/types';

const SearchScreen: React.FC = () => {
    const [results, setResults] = useState<SearchResult[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const apolloClient = useApolloClient();
    const navigation = useNavigation();

    function navigateToProfile(userId: number) {
        navigation.navigate('SearchProfile', { userId });
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
            <View style={styles.searchContainer}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={updateSearchQuery}
                    value={searchQuery}
                />
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
                                            uri:
                                                'https://files.thehandbook.com/uploads/2019/03/ronaldo.jpg',
                                        }}
                                    />
                                )}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    searchContainer: { padding: 2, borderRadius: 2, borderColor: 'black' },
});

export default SearchScreen;
