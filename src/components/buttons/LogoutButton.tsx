import { Auth } from 'aws-amplify';
import React from 'react';
import { Button } from 'react-native';

const LogoutButton: React.FC = () => {
    async function logout() {
        await Auth.signOut();
    }
    return <Button title={'Logout'} onPress={logout} />;
};

export default LogoutButton;
