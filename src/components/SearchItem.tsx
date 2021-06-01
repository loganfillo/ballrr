import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';

interface Props {
    description: string;
    title: string;
    profilePic: string;
}
const SearchItem: React.FC<Props> = ({ description, title, profilePic }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.profPic}>
                {profilePic && (
                    <Avatar.Image
                        size={54}
                        source={{
                            uri: profilePic,
                        }}
                    />
                )}
            </View>
            <View style={styles.profInfo}>
                <Text style={styles.username}>{description}</Text>
                <Text style={styles.fullname}>{title}</Text>
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
    profPic: {
        marginRight: 15,
        marginLeft: 15,
    },
    username: {
        color: 'black',
        fontSize: 16,
        marginTop: 5,
        fontWeight: '600',
    },
    fullname: {
        color: 'grey',
        fontSize: 16,
    },
    profInfo: {
        flexDirection: 'column',
    },
});

export default SearchItem;
