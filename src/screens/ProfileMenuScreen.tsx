import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const ProfileMenu: React.FC = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <Text>SUB MENU</Text>
                <Button title="Account Settings" onPress={() => navigation.navigate('Settings')} />
                <Button title="User Policy" onPress={() => navigation.navigate('Policy')} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
    },
});

export default ProfileMenu;
