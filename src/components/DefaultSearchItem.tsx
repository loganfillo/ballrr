import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Flag } from '../lib/types';

interface Props {
    resultUserId: number;
    username: string;
    full_name: string;
    position: string;
    profile_pic: string | undefined;
}
const DefaultSearchItem: React.FC<Props> = ({
    resultUserId,
    username,
    full_name,
    position,
    profile_pic,
}: Props) => {
    return (
        <View style={styles.column}>
            <View style={styles.profPic}>
                {profile_pic ? (
                    <Image
                        style={{
                            borderColor: 'lightgrey',
                            borderWidth: 1,
                            borderRadius: 10,
                            height: undefined,
                            aspectRatio: 1,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            width: '90%',
                        }}
                        source={{
                            uri: profile_pic,
                        }}
                    />
                ) : (
                    <View
                        style={{
                            borderColor: 'lightgrey',
                            borderWidth: 1,
                            borderRadius: 5,
                            height: undefined,
                            aspectRatio: 1,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            width: '90%',
                        }}
                    >
                        <Text style={{ color: 'lightgrey', fontSize: 50, textAlign: 'center' }}>
                            ?
                        </Text>
                    </View>
                )}
            </View>
            <View style={styles.profInfo}>
                <Text style={styles.username}>@{username}</Text>
                {full_name !== 'null' && <Text style={styles.fullname}>{full_name}</Text>}
                {position !== 'null' && <Text style={styles.fullname}>{position}</Text>}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    column: {
        width: '33%',
        marginTop: 20,
    },
    profPic: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    profInfo: {
        flexDirection: 'column',
        alignContent: 'center',
        width: '90%',
    },
    username: {
        color: 'black',
        fontSize: 12,
        marginTop: 5,
        fontWeight: '500',
    },
    fullname: {
        color: 'grey',
        fontSize: 12,
    },
});

export default DefaultSearchItem;
