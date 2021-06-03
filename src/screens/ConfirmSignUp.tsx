import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthTextInput from '../components/AuthTextInput';
import AuthButton from '../components/buttons/AuthButton';
import { useNavigation } from '@react-navigation/native';

const ConfirmSignUp: React.FC = () => {
    const [username, setUsername] = useState('');
    const [authCode, setAuthCode] = useState('');
    const navigation = useNavigation();
    const [errorMessage, setErrorMessage] = useState('');
    async function confirmSignUp() {
        Keyboard.dismiss();
        try {
            await Auth.confirmSignUp(username, authCode);
            navigation.navigate('SignIn');
            // Set Alert - Account Verified
        } catch (error) {
            console.log(error.code);
            setErrorMessage(error.message);
        }
    }
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Confirm Sign Up</Text>
                <AuthTextInput
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    placeholder="Enter username"
                    autoCapitalize="none"
                />
                <AuthTextInput
                    value={authCode}
                    onChangeText={(text) => setAuthCode(text)}
                    placeholder="Enter verification code"
                    keyboardType="numeric"
                />
                <AuthButton title="Confirm Sign Up" onPress={confirmSignUp} />
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
    errorMessage: {
        color: 'red',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default ConfirmSignUp;
