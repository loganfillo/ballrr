import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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

    const navigation = useNavigation();

    async function signIn() {
        try {
            await Auth.signIn(username, password);
            user.updateLoginStatus(true);
            params.updateAuthState(true);
        } catch (error) {
            console.log(error);
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
                />
                <AuthTextInput
                    value={password}
                    onChangeText={(text: React.SetStateAction<string>) => setPassword(text)}
                    placeholder="Password"
                />
                <View style={{ marginTop: 25 }}>
                    <AuthButton title="Login" onPress={signIn} />
                </View>
                <View style={styles.footerButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.forgotPasswordButtonText}>Don't have an Account? Register</Text>
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
    forgotPasswordButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default SignIn;
