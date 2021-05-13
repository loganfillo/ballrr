import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import ProfileButton from './ProfileButton';

interface Props {
    style: StyleProp<ViewStyle>;
}
const AccountSettingsButton: React.FC<Props> = ({ style }: Props) => {
    const navigation = useNavigation();

    function navigateToAccountSettings() {
        navigation.navigate('AccountSettings');
    }

    return (
        <View style={style}>
            <ProfileButton
                title={'Account Settings'}
                onPress={navigateToAccountSettings}
                color={'black'}
            />
        </View>
    );
};

export default AccountSettingsButton;
