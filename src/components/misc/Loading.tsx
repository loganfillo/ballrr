import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container } from 'native-base';
import GradientBackground from './GradientBackground';

const Loading: React.FC = () => {
    return (
        <Container>
            <GradientBackground>
                <View style={styles.logoContainer}>
                    <Text style={styles.logo}>B</Text>
                </View>
            </GradientBackground>
        </Container>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        flex: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontSize: 75,
        color: 'white',
        backgroundColor: 'transparent',
        padding: 2,
        paddingLeft: 9,
        paddingRight: 9,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2,
    },
});

export default Loading;
