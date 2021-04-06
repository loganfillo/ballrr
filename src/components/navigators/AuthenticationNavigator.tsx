import React from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../../screens/SignIn';
import SignUp from '../../screens/SignUp';
import ConfirmSignUp from '../../screens/ConfirmSignUp';

const AuthenticationStack = createStackNavigator();

const AuthenticationNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <AuthenticationStack.Navigator headerMode="none" initialRouteName="SignIn">
                <AuthenticationStack.Screen
                    name="SignIn"
                    component={SignIn}
                    // updateAuthState={updateAuthState}
                ></AuthenticationStack.Screen>
                <AuthenticationStack.Screen name="SignUp" component={SignUp} />
                <AuthenticationStack.Screen name="ConfirmSignUp" component={ConfirmSignUp} />
            </AuthenticationStack.Navigator>
        </NavigationContainer>
    );
};

export default AuthenticationNavigator;
