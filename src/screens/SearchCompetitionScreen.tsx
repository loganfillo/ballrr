/* eslint-disable prettier/prettier */
import { useApolloClient } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { SEARCH_COMPS, } from '../lib/queries';
import { CompSearchResult } from '../lib/types';
import SearchBar from '../components/SearchBar';
import CompetitionSearchItem from '../components/CompetitionSearchItem';

const SearchCompetitionScreen: React.FC = () => {
    const [results, setResults] = useState<CompSearchResult[]>([]);
    const [searchQuery, setSearchQuery] = useState('%');
    const apolloClient = useApolloClient();

    function updateSearchQuery(query: string) {        
        if (query == "") {
            setSearchQuery('%')
        } else {
            setSearchQuery(query);
        }
    
    }

    useEffect(() => {        
        async function search() {
            if (searchQuery !== '') {
                let res
                if (searchQuery == '%'){
                    res = await apolloClient.query({
                        query: SEARCH_COMPS,
                        variables: { search_query: '%'+searchQuery+'%'},
                    });     
                } else {
                    res = await apolloClient.query({
                        query: SEARCH_COMPS,
                        variables: { search_query: '%'+searchQuery+'%'},
                    });
                }

                const fetchedResults: CompSearchResult[] = [];
                for (const comp of res.data.competitions) {
                    fetchedResults.push({
                        name: comp.name,
                        type: comp.type,
                        compId: comp.id
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
                    value={searchQuery == "%" ? "" : searchQuery }
                    autoCapitalize="none"
                    leftIcon="search"
                    color="orange"
                />
                <ScrollView style={{ paddingBottom: 500}}>
                { searchQuery !== '' ? (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        flexWrap: 'wrap',

                    }}
                >
                {results.map((result, index) => {
                    return (
                        <View key={index} style={{paddingLeft: 5, paddingTop: 5}} >
                            <CompetitionSearchItem
                                name={result.name}
                                type={result.type}
                                compId={result.compId}
                            />
                            </View>

                    );
                })}
                </View> ): ( 
                        <></>
                )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default SearchCompetitionScreen;
