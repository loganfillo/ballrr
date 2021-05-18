import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthTextInput from '../components/AuthTextInput';
import AuthButton from '../components/buttons/AuthButton';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword: React.FC = () => {
    const [username, setUsername] = useState('');
    const navigation = useNavigation();
    async function forgotPassword() {
        try {
            await Auth.forgotPassword(username);
            navigation.navigate('ConfirmNewPassword', { username: username });
        } catch (error) {
            console.log(error);
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
                <View style={{ marginTop: 25 }}>
                    <AuthButton title="Send Verification Code" onPress={forgotPassword} />
                </View>
                <View style={styles.footerButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <Text style={styles.alreadyHaveAccount}>
                            Remember Your Password? Sign In
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
        width: '75%',
        textAlign: 'center',
    },
});

export default ForgotPassword;
