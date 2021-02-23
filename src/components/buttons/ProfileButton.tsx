import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
    title: string;
    disabled?: boolean;
    color?: string;
    onPress: () => void;
}

const ProfileButton: React.FC<Props> = ({ title, disabled, color, onPress }: Props) => {
    return (
        <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 8 }}>
            <TouchableOpacity style={{ padding: 5 }} disabled={disabled} onPress={onPress}>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 14,
                        fontWeight: '400',
                        color: color,
                    }}
                >
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileButton;
