import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthTextInput from '../components/AuthTextInput';
import AuthButton from '../components/buttons/AuthButton';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../lib/user';
import { refreshAsync } from 'expo-auth-session';

const SignIn: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const user = useUser();

    const navigation = useNavigation();

    async function signIn() {
        try {
            await Auth.signIn(username, password);
            user.updateLoginStatus(true);
            console.log('Signing In');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Sign in to your account</Text>
                <AuthTextInput
                    value={username}
                    onChangeText={(text: React.SetStateAction<string>) => setUsername(text)}
                    placeholder="Enter username"
                />
                <AuthTextInput
                    value={password}
                    onChangeText={(text: React.SetStateAction<string>) => setPassword(text)}
                    placeholder="Enter password"
                />
                <AuthButton title="Login" onPress={signIn} />
                <View style={styles.footerButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.forgotPasswordButtonText}>
                            Don't have an account? Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: '#202020',
        fontWeight: '500',
        marginVertical: 15,
    },
    footerButtonContainer: {
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotPasswordButtonText: {
        color: 'tomato',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default SignIn;
