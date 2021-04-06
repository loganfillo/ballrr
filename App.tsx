import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import RootNavigator from './src/components/navigators/RootNavigator';
import createApolloClient from './src/lib/apollo';
import { UserProvider } from './src/lib/user';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Loading from './src/components/Loading';
import { Audio } from 'expo-av';
import { Root } from 'native-base';
import Amplify, { Auth } from 'aws-amplify';
//@ts-ignore
import config from './aws-exports';
//@ts-ignore
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticationNavigator from './src/components/navigators/AuthenticationNavigator';

Amplify.configure({
    ...config,
    Analytics: {
        disabled: true,
    },
});

function App(): React.ReactNode {
    const [loading, setLoading] = useState(true);
    const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');

    useEffect(() => {
        setLoading(true);
        async function loadFonts() {
            await Font.loadAsync({
                Roboto: require('native-base/Fonts/Roboto.ttf'),
                Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
                ...Ionicons.font,
            });
        }
        async function setAudioMode() {
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
            });
        }
        async function setup() {
            await loadFonts();
            await setAudioMode();
            setLoading(false);
        }
        setup();
    }, []);

    useEffect(() => {
        checkAuthState();
    }, []);
    async function checkAuthState() {
        try {
            await Auth.currentAuthenticatedUser();
            setUserLoggedIn('loggedIn');
        } catch (err) {
            console.log(err);
            console.log('FAILURE IN APP');
            setUserLoggedIn('loggedOut');
        }
    }

    function updateAuthState(isUserLoggedIn: React.SetStateAction<string>) {
        setUserLoggedIn(isUserLoggedIn);
    }

    const apolloClient = createApolloClient();

    if (loading) {
        console.log();

        return <Loading />;
    }

    return (
        <Root>
            <StatusBar style="dark" />
            <ApolloProvider client={apolloClient}>
                <UserProvider>
                    <NavigationContainer>
                        {isUserLoggedIn === 'initializing' && <Loading />}
                        {isUserLoggedIn === 'loggedIn' && (
                            <RootNavigator updateAuthState={updateAuthState} />
                        )}
                        {isUserLoggedIn === 'loggedOut' && (
                            <AuthenticationNavigator updateAuthState={updateAuthState} />
                        )}
                    </NavigationContainer>
                </UserProvider>
            </ApolloProvider>
        </Root>
    );
}

export default App;
