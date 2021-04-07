import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
    onPress: () => void;
}

const SignInButton: React.FC<Props> = ({ onPress }: Props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        padding: 10,
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
});

export default SignInButton;
