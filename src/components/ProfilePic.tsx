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
                            width: '90%',
                            aspectRatio: 1,
                            alignSelf: 'center',
                        }}
                        source={{
                            uri: image,
                        }}
                    />
                ) : (
                    <View
                        style={{
                            borderColor: 'lightgrey',
                            borderWidth: 1,
                            borderRadius: 100,
                            height: undefined,
                            width: '90%',
                            aspectRatio: 1,
                            alignSelf: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ color: 'lightgrey', fontSize: 50, textAlign: 'center' }}>
                            ?
                        </Text>
                    </View>
                )}
            </View>
            {flag !== undefined && flag.noFlag !== true ? (
                <View style={{ position: 'absolute', top: 68, right: -5 }}>
                    <Text style={{ fontSize: 35 }}>{flag.emoji}</Text>
                </View>
            ) : (
                <></>
            )}
        </>
    );
};

export default ProfilePic;
