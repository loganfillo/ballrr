import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthTextInput from '../components/AuthTextInput';
import AuthButton from '../components/buttons/AuthButton';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword: React.FC = () => {
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();

    async function forgotPassword() {
        Keyboard.dismiss();
        try {
            await Auth.forgotPassword(username);
            navigation.navigate('ConfirmNewPassword', { username: username });
        } catch (error) {
            console.log(error);
            setErrorMessage(error.message);
        }
    }
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Forgot Password</Text>

                <AuthTextInput
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    placeholder="Username"
                    autoCapitalize="none"
                    leftIcon="account-circle"
                />
                <View style={styles.footerButtonContainer}>
                    <Text style={styles.alreadyHaveAccount}>
                        A Verification Code will be sent to your Email Address.
                    </Text>
                </View>
                <View>
                    <AuthButton title="Send Verification Code" onPress={forgotPassword} />
                </View>
                <View style={styles.footerButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <Text style={styles.rememberPassword}>Remember Your Password? Sign In</Text>
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
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    alreadyHaveAccount: {
        color: 'white',
        fontSize: 14,
        fontWeight: '300',
        width: '75%',
        textAlign: 'center',
    },
    rememberPassword: {
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

export default ForgotPassword;
