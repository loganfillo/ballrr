import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
    value: string;
    leftIcon: 'search' | undefined;
    onChangeText: (arg0: string) => void;
    placeholder: string;
    autoCapitalize?: 'none' | undefined;
    color: string;
}

const SearchBar: React.FC<Props> = ({
    value,
    leftIcon,
    onChangeText,
    placeholder,
    autoCapitalize,
    color,
}: Props) => {
    return (
        <View style={styles.container}>
            {leftIcon && (
                <MaterialIcons name={leftIcon} size={28} style={{ ...styles.icon, color: color }} />
            )}
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="grey"
                autoCapitalize={autoCapitalize}
            />
            {value !== '' && (
                <TouchableOpacity onPress={() => onChangeText('')}>
                    <View>
                        <MaterialIcons
                            name="cancel"
                            size={24}
                            style={{ ...styles.cancelIcon, color: color }}
                        />
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 30,
        flexDirection: 'row',
        padding: 5,
        marginVertical: 10,
        width: '95%',
        alignSelf: 'center',
        fontWeight: '300',
    },
    icon: {
        marginRight: 10,
        marginLeft: 10,
        color: '#44B244',
    },
    cancelIcon: {
        marginTop: 2,
        marginLeft: -10,
        color: '#44B244',
    },
    input: {
        width: '80%',
        fontSize: 18,
        color: 'black',
        fontWeight: '300',
    },
});

export default SearchBar;
