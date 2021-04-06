import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
    value: string;
    onChangeText: (arg0: string) => void;
    placeholder: string;
}

const AuthTextInput: React.FC<Props> = ({ value, onChangeText, placeholder }: Props) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#6e6869"
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f9',
        borderRadius: 25,
        flexDirection: 'row',
        padding: 15,
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        width: '80%',
        fontSize: 18,
        color: '#101010',
    },
});

export default AuthTextInput;
