import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import ProfileButton from './ProfileButton';

interface Props {
    style: StyleProp<ViewStyle>;
}
const MessageButton: React.FC<Props> = ({ style }: Props) => {
    return (
        <View style={style}>
            <ProfileButton title={'Message'} onPress={() => 0} />
        </View>
    );
};

export default MessageButton;
