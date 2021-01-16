import React from 'react';
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import SearchBar from '../components/SearchBar';
import { Grid, Row, Col } from 'react-native-easy-grid';

const Search: React.FC = () => {
    return (
        <SafeAreaView>
            <SearchBar />
            <ScrollView>
                {/* <Grid>
                    <Row>
                        <Col>
                            <View style={styles.content}>
                                <Text>EXPLORE CONTENT</Text>
                            </View>
                        </Col>
                        <Col>
                            <View style={styles.content}>
                                <Text>EXPLORE CONTENT</Text>
                            </View>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <View style={styles.content}>
                                <Text>EXPLORE CONTENT</Text>
                            </View>
                        </Col>
                        <Col>
                            <View style={styles.content}>
                                <Text>EXPLORE CONTENT</Text>
                            </View>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <View style={styles.content}>
                                <Text>EXPLORE CONTENT</Text>
                            </View>
                        </Col>
                        <Col>
                            <View style={styles.content}>
                                <Text>EXPLORE CONTENT</Text>
                            </View>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <View style={styles.content}>
                                <Text>EXPLORE CONTENT</Text>
                            </View>
                        </Col>
                        <Col>
                            <View style={styles.content}>
                                <Text>EXPLORE CONTENT</Text>
                            </View>
                        </Col>
                    </Row>
                </Grid> */}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    content: {
        height: 125,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        textAlign: 'center',
    },
});

export default Search;
