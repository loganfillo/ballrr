import React from 'react';
import { StyleProp, View, ViewStyle, Alert } from 'react-native';
import ProfileButton from './ProfileButton';

interface Props {
    style: StyleProp<ViewStyle>;
}
const MessageButton: React.FC<Props> = ({ style }: Props) => {
    return (
        <View style={style}>
            <ProfileButton
                title={'Message'}
                onPress={() => Alert.alert('Messaging coming soon!')}
            />
        </View>
    );
};

export default MessageButton;
