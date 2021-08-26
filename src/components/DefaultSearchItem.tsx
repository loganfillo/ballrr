import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Flag } from '../lib/types';

interface Props {
    resultUserId: number;
    username: string;
    full_name: string | undefined;
    profile_pic: string | undefined;
    flag?: Flag | undefined;
}
const DefaultSearchItem: React.FC<Props> = ({
    resultUserId,
    username,
    full_name,
    profile_pic,
    flag,
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
                            width: '85%',
                        }}
                        source={{
                            uri: profile_pic,
                        }}
                    />
                ) : (
                    <Image
                        style={{
                            borderColor: 'lightgrey',
                            borderWidth: 1,
                            borderRadius: 10,
                            height: undefined,
                            aspectRatio: 1,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            width: '85%',
                        }}
                        source={require('../../assets/profile_icon.png')}
                    />
                )}
                {flag ? (
                    <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
                        <Text style={{ fontSize: 40 }}>{flag.emoji}</Text>
                    </View>
                ) : (
                    <></>
                )}
            </View>
            <View style={styles.profInfo}>
                <Text style={styles.username}>@{username}</Text>
                {full_name !== 'null' && <Text style={styles.fullname}>{full_name}</Text>}
                {flag ? (
                    <View>
                        <Text style={{ fontSize: 40 }}>{flag.emoji}</Text>
                    </View>
                ) : (
                    <></>
                )}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    column: {
        width: '33%',
        marginTop: 25,
        alignItems: 'center',
    },
    profPic: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    profInfo: {
        flexDirection: 'column',
        textAlign: 'center',
        width: '90%',
    },
    username: {
        color: 'black',
        fontSize: 12,
        marginTop: 5,
        fontWeight: '500',
        textAlign: 'center',
    },
    fullname: {
        color: 'grey',
        fontSize: 12,
        textAlign: 'center',
    },
});

export default DefaultSearchItem;
