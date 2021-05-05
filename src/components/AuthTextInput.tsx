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
                placeholderTextColor="white"
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#44B244',
        borderColor: '#EEEADE',
        borderWidth: 1,
        borderRadius: 25,
        flexDirection: 'row',
        padding: 15,
        marginVertical: 10,
        width: '85%',
        alignSelf: 'center',
    },
    icon: {
        marginRight: 10,
    },
    input: {
        width: '80%',
        fontSize: 18,
        color: '#EEEADE',
    },
});

export default AuthTextInput;
