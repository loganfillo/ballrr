import { Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import React from 'react';
import { Icon } from 'native-base';

const ChallengeOthersButton: React.FC = () => {
    return (
        <TouchableOpacity
            onPress={() => Alert.alert('Need to Create Invite Others')}
            style={styles.challengeOthersButtonContainer}
        >
            <Text style={styles.challengeOthersButtonText}>Challenge Others</Text>
            <Icon style={styles.buttonIcon} name="football" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    challengeOthersButtonContainer: {
        elevation: 8,
        backgroundColor: '#5ee66c',
        borderRadius: 10,
        paddingLeft: 25,
        paddingRight: 10,
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    challengeOthersButtonText: {
        fontSize: 18,
        color: '#000',
        fontWeight: '400',
        alignSelf: 'center',
    },
    buttonIcon: {
        height: 40,
        width: 40,
        alignContent: 'flex-end',
    },
});

export default ChallengeOthersButton;
