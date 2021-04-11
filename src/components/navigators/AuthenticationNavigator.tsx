import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import SignIn from '../../screens/SignIn';
import SignUp from '../../screens/SignUp';
import ConfirmSignUp from '../../screens/ConfirmSignUp';

export type AuthenticationStackParamList = {
    SignIn: { updateAuthState: (isUserLoggedIn: boolean) => void };
    SignUp: undefined;
    ConfirmSignUp: undefined;
};

const AuthenticationStack = createStackNavigator<AuthenticationStackParamList>();

interface Props {
    updateAuthState: (isUserLoggedIn: boolean) => void;
}

const AuthenticationNavigator: React.FC<Props> = ({ updateAuthState }: Props) => {
    return (
        <NavigationContainer>
            <AuthenticationStack.Navigator headerMode="none" initialRouteName="SignIn">
                <AuthenticationStack.Screen
                    name="SignIn"
                    component={SignIn}
                    initialParams={{ updateAuthState: updateAuthState }}
                ></AuthenticationStack.Screen>
                <AuthenticationStack.Screen name="SignUp" component={SignUp} />
                <AuthenticationStack.Screen name="ConfirmSignUp" component={ConfirmSignUp} />
            </AuthenticationStack.Navigator>
        </NavigationContainer>
    );
};

export default AuthenticationNavigator;
