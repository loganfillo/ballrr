import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthMenu from '../../screens/AuthMenuScreen';
import SignIn from '../../screens/SignIn';
import SignUp from '../../screens/SignUp';
import ConfirmSignUp from '../../screens/ConfirmSignUp';
import ForgotPassword from '../../screens/ForgotPassword';
import ConfirmNewPassword from '../../screens/ConfirmNewPassword';

export type AuthenticationStackParamList = {
    AuthMenu: undefined;
    SignIn: { updateAuthState: (isUserLoggedIn: boolean) => void };
    SignUp: undefined;
    ConfirmSignUp: undefined;
    ForgotPassword: undefined;
    ConfirmNewPassword: { username: string };
};

const AuthenticationStack = createStackNavigator<AuthenticationStackParamList>();

interface Props {
    updateAuthState: (isUserLoggedIn: boolean) => void;
}

const AuthenticationNavigator: React.FC<Props> = ({ updateAuthState }: Props) => {
    return (
        <NavigationContainer>
            <AuthenticationStack.Navigator headerMode="none" initialRouteName="AuthMenu">
                <AuthenticationStack.Screen name="AuthMenu" component={AuthMenu} />
                <AuthenticationStack.Screen
                    name="SignIn"
                    component={SignIn}
                    initialParams={{ updateAuthState: updateAuthState }}
                ></AuthenticationStack.Screen>
                <AuthenticationStack.Screen name="SignUp" component={SignUp} />
                <AuthenticationStack.Screen name="ConfirmSignUp" component={ConfirmSignUp} />
                <AuthenticationStack.Screen name="ForgotPassword" component={ForgotPassword} />
                <AuthenticationStack.Screen
                    name="ConfirmNewPassword"
                    component={ConfirmNewPassword}
                />
            </AuthenticationStack.Navigator>
        </NavigationContainer>
    );
};

export default AuthenticationNavigator;
