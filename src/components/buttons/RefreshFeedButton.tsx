import { Dimensions, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface Props {
    onPress: () => void;
}

const RefreshFeedButton: React.FC<Props> = ({ onPress }: Props) => {
    const { width } = Dimensions.get('window');
    return (
        <TouchableOpacity
            onLongPress={onPress}
            style={{
                flex: 1,
                width: '35%',
                height: 0.1 * width,
                position: 'absolute',
                alignSelf: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                top: 0.1 * width,
                backgroundColor: 'white',
                borderRadius: 100,
            }}
        >
            <Text style={{ color: 'black', fontWeight: '500', fontSize: 16, textAlign: 'center' }}>
                Hold to Refresh
            </Text>
        </TouchableOpacity>
    );
};

export default RefreshFeedButton;
