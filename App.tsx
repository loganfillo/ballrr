import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import RootNavigator from './src/components/navigators/RootNavigator';
import createApolloClient from './src/lib/apollo';
import { UserProvider, useUser } from './src/lib/user';
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
import AuthenticationNavigator from './src/components/navigators/AuthenticationNavigator';

Amplify.configure({
    ...config,
    Analytics: {
        disabled: true,
    },
});

function App(): React.ReactNode {
    const [loading, setLoading] = useState(true);
    const [isUserLoggedIn, setUserLoggedIn] = useState(false);

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
        setLoading(true);
        try {
            await Auth.currentAuthenticatedUser();
            updateAuthState(true);
        } catch (err) {
            updateAuthState(false);
            console.log(err);
        }
        setLoading(false);
    }

    function updateAuthState(isUserLoggedIn: boolean | ((prevState: boolean) => boolean)) {
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
                {isUserLoggedIn === true && (
                    <UserProvider updateAuthState={updateAuthState}>
                        <RootNavigator />
                    </UserProvider>
                )}
                {isUserLoggedIn === false && (
                    <AuthenticationNavigator updateAuthState={updateAuthState} />
                )}
            </ApolloProvider>
        </Root>
    );
}

export default App;
