import React from 'react';
import { Text, StyleSheet, ScrollView, SafeAreaView, View } from 'react-native';

const HardCodedSearchScreen: React.FC = () => {
    return (
        <SafeAreaView>
            <View style={styles.profileRow}>
                <View style={styles.profileView}>
                    <Text style={{ textAlign: 'center' }}>Simon Cooper</Text>
                </View>
                <View style={styles.profileView}>
                    <Text style={{ textAlign: 'center' }}>Desmond Tach</Text>
                </View>
                <View style={styles.profileView}>
                    <Text style={{ textAlign: 'center' }}>Ben MacDonald</Text>
                </View>
            </View>
            <View style={styles.profileRow}>
                <View style={styles.profileView}>
                    <Text style={{ textAlign: 'center' }}>Dana Harlos</Text>
                </View>
                <View style={styles.profileView}>
                    <Text style={{ textAlign: 'center' }}>Logan Fillo</Text>
                </View>
                <View style={styles.profileView}>
                    <Text style={{ textAlign: 'center' }}>Colin Little</Text>
                </View>
            </View>
            <View style={styles.profileRow}>
                <View style={styles.profileView}>
                    <Text style={{ textAlign: 'center' }}>Marcus Rashford</Text>
                </View>
                <View style={styles.profileView}>
                    <Text style={{ textAlign: 'center' }}>Lance Brass</Text>
                </View>
                <View style={styles.profileView}>
                    <Text style={{ textAlign: 'center' }}>Peter Crouch</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    profileRow: {
        flexDirection: 'row',
        marginBottom: 15,
        flex: 3,
    },
    profileView: {
        borderWidth: 1,
        flex: 1,
        borderColor: 'black',
        borderRadius: 10,
        height: 133,
        width: 100,
        margin: 5,
    },
});

export default HardCodedSearchScreen;
