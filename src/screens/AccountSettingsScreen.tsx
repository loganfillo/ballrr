import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import LogoutButton from '../components/buttons/LogoutButton';
import DeleteAccountButton from '../components/buttons/DeleteAccountButton';

const Settings: React.FC = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: '#fff', padding: 20 }}>
                <LogoutButton style={{ flex: 1, padding: 10 }} />
                <DeleteAccountButton style={{ flex: 1, padding: 10 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Settings;
