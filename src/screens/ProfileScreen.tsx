import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, StyleSheet, ScrollView, SafeAreaView, Button } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';
import LogoutButton from '../components/buttons/LogoutButton';

const ProfileScreen: React.FC = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <View style={styles.profHeader}>
                    <Grid>
                        <Row>
                            <Col>
                                <View style={styles.profPic}>
                                    <Text>ProfilePic</Text>
                                </View>
                                <LogoutButton />
                            </Col>
                        </Row>
                        <Row>
                            <View style={styles.userContainer}>
                                <Text style={styles.userName}>Ben MacDonald</Text>
                            </View>
                        </Row>
                        <Row>
                            <Col>
                                <View style={styles.editContainer}>
                                    <Button
                                        title="Edit"
                                        onPress={() => navigation.navigate('Edit')}
                                    />
                                </View>
                            </Col>
                            <Col>
                                <View style={styles.menuContainer}>
                                    <Button
                                        title="Menu"
                                        onPress={() => navigation.navigate('Menu')}
                                    />
                                </View>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Text>Likes</Text>
                            </Col>
                            <Col>
                                <Text>Followers</Text>
                            </Col>
                            <Col>
                                <Text>Following</Text>
                            </Col>
                        </Row>
                    </Grid>
                </View>
                <View style={styles.contentContainer}>
                    <Grid>
                        <Row>
                            <Col>
                                <View style={styles.content}>
                                    <Text>Post 1</Text>
                                </View>
                            </Col>

                            <Col>
                                <View style={styles.content}>
                                    <Text>Post 2</Text>
                                </View>
                            </Col>

                            <Col>
                                <View style={styles.content}>
                                    <Text>Post 3</Text>
                                </View>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <View style={styles.content}>
                                    <Text>Post 4</Text>
                                </View>
                            </Col>

                            <Col>
                                <View style={styles.content}>
                                    <Text>Post 5</Text>
                                </View>
                            </Col>

                            <Col>
                                <View style={styles.content}>
                                    <Text>Post 6</Text>
                                </View>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <View style={styles.content}>
                                    <Text>Post 7</Text>
                                </View>
                            </Col>

                            <Col>
                                <View style={styles.content}>
                                    <Text>Post 8</Text>
                                </View>
                            </Col>
                            <Col>
                                <View style={styles.content}>
                                    <Text>Post 9</Text>
                                </View>
                            </Col>
                        </Row>
                    </Grid>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        padding: 20,
    },
    profHeader: {
        backgroundColor: '#ffffff',
        color: 'black',
    },
    profPic: {
        backgroundColor: 'grey',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 75 / 2,
        height: 75,
        width: 75,
        justifyContent: 'center',
        textAlign: 'center',
        alignSelf: 'center',
    },
    userContainer: {
        justifyContent: 'center',
        textAlign: 'center',
    },
    userName: {
        fontSize: 30,
        paddingBottom: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    contentContainer: {
        borderTopColor: 'black',
        borderTopWidth: 2,
        paddingTop: 20,
    },
    content: {
        height: 125,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        textAlign: 'center',
    },
    editContainer: {
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        textAlign: 'center',
        margin: 10,
    },
    menuContainer: {
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        textAlign: 'center',
        margin: 10,
    },
});

export default ProfileScreen;
