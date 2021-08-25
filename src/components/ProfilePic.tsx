import React from 'react';
import { Image, Text, View } from 'react-native';
import { Flag } from '../lib/types';

interface Props {
    image: string;
    flag?: Flag | undefined;
}

const ProfilePic: React.FC<Props> = ({ flag, image }: Props) => {
    return (
        <>
            <View style={{ flex: 1 }}>
                {image !== '' ? (
                    <Image
                        style={{
                            borderRadius: 100,
                            height: undefined,
                            width: '80%',
                            aspectRatio: 1,
                            alignSelf: 'center',
                        }}
                        source={{
                            uri: image,
                        }}
                    />
                ) : (
                    <Image
                        style={{
                            borderRadius: 100,
                            height: undefined,
                            width: '80%',
                            aspectRatio: 1,
                            alignSelf: 'center',
                        }}
                        source={require('../../assets/profile_icon.png')}
                    />
                )}
            </View>
            {flag !== undefined && flag.noFlag !== true ? (
                <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
                    <Text style={{ fontSize: 40 }}>{flag.emoji}</Text>
                </View>
            ) : (
                <></>
            )}
        </>
    );
};

export default ProfilePic;
