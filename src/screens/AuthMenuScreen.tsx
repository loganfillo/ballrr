/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthButton from '../components/buttons/AuthButton';
import { useNavigation } from '@react-navigation/native';

const AuthMenu: React.FC = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <Image
                    style={styles.headingImage}
                    source={require('../../assets/authMenuLogo2.png')}
                />
                <View style={{ marginTop: 30 }}>
                    <AuthButton title="Login" onPress={() => navigation.navigate('SignIn')} />
                </View>
                <AuthButton title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#44B244',
    },
    container: {
        flex: 1,
    },
    headingImage: {
        width: '100%',
        aspectRatio: 1,
        height: undefined,
    },
});

export default AuthMenu;
