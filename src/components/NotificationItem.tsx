import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';

interface Props {
    username: string;
    notifType: string;
    thumbnail: string;
}
const NotificationItem: React.FC<Props> = ({ username, notifType, thumbnail }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.thumbnailPic}>
                <Avatar.Image
                    size={40}
                    source={{
                        uri: thumbnail,
                    }}
                />
            </View>
            <View style={styles.notifInfo}>
                {notifType === 'LIKE' && (
                    <Text>
                        <Text style={{ fontWeight: '600' }}>@{username}</Text> has Liked Your Post
                    </Text>
                )}
                {notifType === 'FOLLOW' && (
                    <Text>
                        <Text style={{ fontWeight: '600' }}>@{username}</Text> has started Following
                        You
                    </Text>
                )}
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
        marginLeft: 15,
    },
    info: {
        color: 'black',
        fontSize: 23,
    },
    notifInfo: {
        flexDirection: 'column',
        marginLeft: 10,
        marginTop: 10,
    },
});

export default NotificationItem;
