import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import ProfileButton from './ProfileButton';

interface Props {
    style: StyleProp<ViewStyle>;
}
const EditProfileButton: React.FC<Props> = ({ style }: Props) => {
    const navigation = useNavigation();

    function navigateToEdit() {
        navigation.navigate('Edit');
    }

    return (
        <View style={style}>
            <ProfileButton title={'Edit Profile'} onPress={navigateToEdit} />
        </View>
    );
};

export default EditProfileButton;
