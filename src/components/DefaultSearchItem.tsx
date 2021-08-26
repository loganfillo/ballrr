import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Flag } from '../lib/types';

interface Props {
    resultUserId: number;
    username: string;
    full_name: string | undefined;
    profile_pic: string | undefined;
    flag: string;
}
const DefaultSearchItem: React.FC<Props> = ({
    resultUserId,
    username,
    full_name,
    profile_pic,
    flag,
}: Props) => {
    const [user_flag, setUserFlag] = useState<Flag>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navigation = useNavigation<StackNavigationProp<any>>();

    function navigateToProfile(userId: number) {
        navigation.navigate('ProfileNavigator', { screen: 'Profile', params: { userId } });
    }

    useEffect(() => {
        if (flag !== '') setUserFlag(JSON.parse(flag));
    }, []);

    return (
        <View style={styles.column}>
            <TouchableOpacity onPress={() => navigateToProfile(resultUserId)}>
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
                    {user_flag ? (
                        <View style={{ position: 'absolute', bottom: -15, right: -10 }}>
                            <Text style={{ fontSize: 28 }}>{user_flag.emoji}</Text>
                        </View>
                    ) : (
                        <></>
                    )}
                </View>
                <View style={styles.profInfo}>
                    <Text style={styles.username}>@{username}</Text>
                    {full_name !== 'null' && <Text style={styles.fullname}>{full_name}</Text>}
                </View>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    column: {
        width: '33%',
        marginTop: 5,
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
