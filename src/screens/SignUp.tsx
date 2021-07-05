import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthTextInput from '../components/AuthTextInput';
import AuthButton from '../components/buttons/AuthButton';
import { useNavigation } from '@react-navigation/native';

const SignUp: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();
    async function signUp() {
        Keyboard.dismiss();
        try {
            await Auth.signUp({ username, password, attributes: { email } });
            navigation.navigate('ConfirmSignUp');
        } catch (error) {
            console.log(error);
            setErrorMessage(error.message);
        }
    }
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Sign Up</Text>
                <AuthTextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    leftIcon="email"
                />
                <AuthTextInput
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    placeholder="Username"
                    autoCapitalize="none"
                    leftIcon="account-circle"
                />
                <AuthTextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Password"
                    secureTextEntry
                    autoCapitalize="none"
                    leftIcon="lock"
                />
                <View style={{ marginTop: 25 }}>
                    <AuthButton title="Sign Up" onPress={signUp} />
                </View>
                <View style={styles.footerButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <Text style={styles.alreadyHaveAccount}>
                            Already have an account? Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
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
    title: {
        fontSize: 40,
        color: 'white',
        fontWeight: '500',
        marginTop: 80,
        marginBottom: 15,
        marginLeft: 30,
        textAlign: 'left',
    },
    footerButtonContainer: {
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    alreadyHaveAccount: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    errorMessage: {
        color: 'red',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default SignUp;
