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
                        size={46}
                        source={{
                            uri: profilePic,
                        }}
                    />
                )}
            </View>
            <View style={styles.profInfo}>
                <Text style={styles.info}>{description}</Text>
                <Text style={styles.info}>{title}</Text>
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
    },
    info: {
        color: 'black',
        fontSize: 20,
    },
    profInfo: {
        flexDirection: 'column',
    },
});

export default SearchItem;
