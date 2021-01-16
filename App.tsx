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
import Amplify from 'aws-amplify';
//@ts-ignore
import config from './aws-exports';
//@ts-ignore
import { withAuthenticator } from 'aws-amplify-react-native';
import { StatusBar } from 'expo-status-bar';

Amplify.configure({
    ...config,
    Analytics: {
        disabled: true,
    },
});

function App(): React.ReactNode {
    const [loading, setLoading] = useState(true);

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
                    <RootNavigator />
                </UserProvider>
            </ApolloProvider>
        </Root>
    );
}

export default withAuthenticator(App);
