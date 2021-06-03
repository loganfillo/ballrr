import React from 'react';
import { View, StyleSheet, TextInput, TextComponent } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
    value: string;
    leftIcon?: 'email' | 'lock' | 'account-circle' | 'vpn-key' | undefined;
    onChangeText: (arg0: string) => void;
    placeholder: string;
    secureTextEntry?: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
    keyboardType?: 'email-address' | 'numeric' | undefined;
    textContentType?: 'username' | 'password' | 'emailAddress' | undefined;
}

const AuthTextInput: React.FC<Props> = ({
    value,
    leftIcon,
    onChangeText,
    placeholder,
    secureTextEntry,
    autoCapitalize,
    keyboardType,
    textContentType,
}: Props) => {
    return (
        <View style={styles.container}>
            {leftIcon && (
                <MaterialIcons name={leftIcon} size={28} color="#6e6869" style={styles.icon} />
            )}
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="white"
                secureTextEntry={secureTextEntry}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                textContentType={textContentType}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#44B244',
        borderColor: '#EEEADE',
        borderWidth: 1,
        borderRadius: 30,
        flexDirection: 'row',
        padding: 12,
        marginVertical: 10,
        width: '85%',
        alignSelf: 'center',
    },
    icon: {
        marginRight: 10,
        color: '#EEEADE',
    },
    input: {
        width: '80%',
        fontSize: 18,
        color: '#EEEADE',
    },
});

export default AuthTextInput;
