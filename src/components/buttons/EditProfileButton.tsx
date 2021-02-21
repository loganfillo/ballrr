import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
            <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 8 }}>
                <TouchableOpacity style={{ padding: 5 }} onPress={navigateToEdit}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 14,
                            fontWeight: '400',
                            color: 'black',
                        }}
                    >
                        Edit Profile
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditProfileButton;
