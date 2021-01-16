import React from 'react';
import { Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const Policy: React.FC = () => {
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <Text>User Policy Agreement Blah Blah Blah</Text>
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

export default Policy;
