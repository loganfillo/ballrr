import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    style: StyleProp<ViewStyle>;
}
const MessageButton: React.FC<Props> = ({ style }: Props) => {
    return (
        <View style={style}>
            <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 8 }}>
                <TouchableOpacity style={{ padding: 5 }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 14,
                            fontWeight: '400',
                            color: 'black',
                        }}
                    >
                        Message
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MessageButton;
