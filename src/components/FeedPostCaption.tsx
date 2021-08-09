import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Props {
    username: string;
    caption: string;
    userId: number;
}

const FeedPostCaption: React.FC<Props> = ({ username, caption, userId }: Props) => {
    const [finalCaption] = useState(processCaption());

    const navigation = useNavigation();

    function processCaption(): string {
        return caption.trim();
    }

    function navigateToProfile() {
        navigation.navigate('Profile', { screen: 'Profile', params: { userId } });
    }

    return (
        <TouchableOpacity onPress={() => navigateToProfile()}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                {'@' + username}
            </Text>
            {finalCaption.length > 0 ? (
                <Text style={{ fontSize: 13, color: 'white', fontWeight: 'normal' }}>
                    {finalCaption}
                </Text>
            ) : (
                <></>
            )}
        </TouchableOpacity>
    );
};

export default FeedPostCaption;
