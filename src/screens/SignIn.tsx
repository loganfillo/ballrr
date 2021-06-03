import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthTextInput from '../components/AuthTextInput';
import AuthButton from '../components/buttons/AuthButton';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useUser } from '../lib/user';
import { AuthenticationStackParamList } from '../components/navigators/AuthenticationNavigator';

type SignInRouteProp = RouteProp<AuthenticationStackParamList, 'SignIn'>;

const SignIn: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { params } = useRoute<SignInRouteProp>();
    const user = useUser();
    const [errorMessage, setErrorMessage] = useState('');

    const navigation = useNavigation();

    async function signIn() {
        Keyboard.dismiss();
        try {
            await Auth.signIn(username, password);
            user.updateLoginStatus(true);
            params.updateAuthState(true);
        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message);
        }
    }
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <AuthTextInput
                    value={username}
                    onChangeText={(text: React.SetStateAction<string>) => setUsername(text)}
                    placeholder="Username"
                    autoCapitalize="none"
                    textContentType="username"
                    leftIcon="account-circle"
                />
                <AuthTextInput
                    value={password}
                    onChangeText={(text: React.SetStateAction<string>) => setPassword(text)}
                    placeholder="Password"
                    secureTextEntry
                    autoCapitalize="none"
                    textContentType="password"
                    leftIcon="lock"
                />
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 25 }}>
                    <AuthButton title="Login" onPress={signIn} />
                </View>
                <View style={styles.footerButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.registerButton}>Don't have an Account? Register</Text>
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
    forgotPassword: {
        textAlign: 'right',
        color: '#EEEADE',
        marginTop: 5,
        marginRight: 35,
        fontSize: 12,
    },
    registerButton: {
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

export default SignIn;
