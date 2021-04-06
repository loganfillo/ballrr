import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
    title: string;
    onPress: () => void;
}

// Touchable O also needs onPress behaviour

const AuthButton: React.FC<Props> = ({ title, onPress }: Props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    button: {
        marginVertical: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '80%',
        backgroundColor: 'green',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
});

export default AuthButton;
