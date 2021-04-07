import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { Icon } from 'native-base';

const AddChallengeButton: React.FC = () => {
    return (
        <TouchableOpacity
            onPress={() => Alert.alert('Need to Create Challenge Page')}
            style={styles.challengeButtonContainer}
        >
            <Text style={styles.challengeButtonText}>Add a Challenge</Text>
            <Icon style={styles.buttonIcon} name="trophy" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonIcon: {
        height: 40,
        width: 40,
        alignContent: 'flex-end',
    },
    challengeButtonContainer: {
        elevation: 8,
        backgroundColor: '#65dbdb',
        borderRadius: 10,
        paddingLeft: 25,
        paddingRight: 10,
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    challengeButtonText: {
        fontSize: 18,
        color: '#000',
        fontWeight: '400',
        alignSelf: 'center',
    },
});

export default AddChallengeButton;
