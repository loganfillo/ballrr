import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthTextInput from '../components/AuthTextInput';
import AuthButton from '../components/buttons/AuthButton';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AuthenticationStackParamList } from '../components/navigators/AuthenticationNavigator';

type ConfirmNewPasswordRouteProp = RouteProp<AuthenticationStackParamList, 'ConfirmNewPassword'>;

const ConfirmNewPassword: React.FC = () => {
    const [code, setCode] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();
    const { params } = useRoute<ConfirmNewPasswordRouteProp>();
    const username = params.username;

    async function enterNewPassword() {
        Keyboard.dismiss();
        try {
            await Auth.forgotPasswordSubmit(username, code, new_password);
            navigation.navigate('SignIn');
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
                    value={code}
                    onChangeText={(text) => setCode(text)}
                    placeholder="VerificationCode"
                    autoCapitalize="none"
                    leftIcon="vpn-key"
                />
                <AuthTextInput
                    value={new_password}
                    onChangeText={(text: React.SetStateAction<string>) => setNewPassword(text)}
                    placeholder="New Password"
                    secureTextEntry
                    autoCapitalize="none"
                    textContentType="password"
                    leftIcon="lock"
                />
                <View style={{ marginTop: 25 }}>
                    <AuthButton title="Submit New Password" onPress={enterNewPassword} />
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
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
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

export default ConfirmNewPassword;
