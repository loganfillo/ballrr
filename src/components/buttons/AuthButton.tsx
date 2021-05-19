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
        marginTop: 20,
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '70%',
        backgroundColor: 'white',
    },
    buttonText: {
        color: '#44B244',
        fontSize: 18,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
});

export default AuthButton;
