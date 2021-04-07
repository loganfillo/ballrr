import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

interface Props {
    name: string;
    size: number;
    color?: string;
    onPress: () => void;
}
const TabIcon: React.FC<Props> = ({ name, onPress, size, color }: Props) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <MaterialCommunityIcons name={name} size={size} color={color} />
        </TouchableOpacity>
    );
};

export default TabIcon;
