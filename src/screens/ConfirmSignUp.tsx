import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthTextInput from '../components/AuthTextInput';
import AuthButton from '../components/buttons/AuthButton';
import { useNavigation } from '@react-navigation/native';

const ConfirmSignUp: React.FC = () => {
    const [username, setUsername] = useState('');
    const [authCode, setAuthCode] = useState('');
    const navigation = useNavigation();
    async function confirmSignUp() {
        try {
            await Auth.confirmSignUp(username, authCode);
            navigation.navigate('SignIn');
            // Set Alert - Account Verified
        } catch (error) {
            console.log(error.code);
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
                />
                <AuthTextInput
                    value={authCode}
                    onChangeText={(text) => setAuthCode(text)}
                    placeholder="Enter verification code"
                />
                <AuthButton title="Confirm Sign Up" onPress={confirmSignUp} />
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
});

export default ConfirmSignUp;
