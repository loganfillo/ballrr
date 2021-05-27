import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';

interface Props {
    username: string;
    notifType: string;
    thumbnail: string;
}
const NotificationItem: React.FC<Props> = ({ username, notifType, thumbnail }: Props) => {
    return (
        <View>
            <Avatar.Image
                size={35}
                source={{
                    uri: thumbnail,
                }}
            />
            <Text>{username}</Text>
            <Text>{notifType}</Text>
        </View>
    );
};

export default NotificationItem;
