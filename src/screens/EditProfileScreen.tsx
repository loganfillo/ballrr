import React from 'react';
import { Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const EditProfile: React.FC = () => {
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <Text>Update Profile Pic</Text>
                <Text>Update Bio</Text>
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

export default EditProfile;
