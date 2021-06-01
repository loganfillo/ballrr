import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';

const PLACE_HOLDER_IMAGE = 'https://files.thehandbook.com/uploads/2019/03/ronaldo.jpg';

interface Props {
    username: string;
    notifType: string;
    thumbnail: string;
}
const NotificationItem: React.FC<Props> = ({ username, notifType, thumbnail }: Props) => {
    const [notifmessage, setNotifMessage] = useState('');
    const [thumbnailPic, setThumbnailPic] = useState('')

    if (notifType === 'like') {
        setNotifMessage(username + ' has liked your Post');
    } else if (notifType === 'follow') {
        setNotifMessage(username + ' has started following you');
    }

    if (thumbnail === null) {
        setThumbnailPic(PLACE_HOLDER_IMAGE);
    } else {
        setThumbnailPic(thumbnail);
    }

    return (
        <View style={styles.container}>
            <View style={styles.thumbnailPic}>
                <Avatar.Image
                    size={35}
                    source={{
                        uri: thumbnailPic,
                    }}
                />
            </View>
            <View style={styles.notifInfo}>
                <Text>{notifmessage}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: '#EEEADE',
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingVertical: 10,
    },
    thumbnailPic: {
        marginRight: 15,
    },
    info: {
        color: 'black',
        fontSize: 20,
    },
    notifInfo: {
        flexDirection: 'column',
    },
});

export default NotificationItem;
