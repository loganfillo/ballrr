import React from 'react';
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const Settings: React.FC = () => {
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <Text>Account Settings Displayed </Text>
                <View style={styles.top} />
                <View style={styles.middle} />
                <View style={styles.bottom} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
    },
    top: {
        backgroundColor: 'grey',
        borderWidth: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 200,
    },
    middle: {
        backgroundColor: 'beige',
        borderWidth: 5,
        height: 200,
    },
    bottom: {
        backgroundColor: 'pink',
        borderWidth: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height: 200,
    },
});

export default Settings;
