import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthTextInput from '../components/AuthTextInput';
import AuthButton from '../components/buttons/AuthButton';
import { useNavigation } from '@react-navigation/native';

const SignUp: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigation = useNavigation();
    async function signUp() {
        try {
            await Auth.signUp({ username, password, attributes: { email } });
            navigation.navigate('ConfirmSignUp');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Create a new account</Text>
                <AuthTextInput
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    placeholder="Enter username"
                />
                <AuthTextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Enter password"
                />
                <AuthTextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Enter email"
                />
                <AuthButton title="Sign Up" onPress={signUp} />
                <View style={styles.footerButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <Text style={styles.forgotPasswordButtonText}>
                            Already have an account? Sign In
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

export default SignUp;
