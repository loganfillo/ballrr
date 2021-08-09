import React from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Loading: React.FC = () => {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <Image
                    style={styles.headingImage}
                    source={require('../../assets/authMenuLogo2.png')}
                />
                <ActivityIndicator color="white" size="large" />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#44B244',
    },
    container: {
        flex: 1,
    },
    headingImage: {
        width: '100%',
        aspectRatio: 1,
        height: undefined,
    },
});

export default Loading;
