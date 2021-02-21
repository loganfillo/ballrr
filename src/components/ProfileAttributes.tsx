import React from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';

interface Props {
    profileUserId: number;
}

const ProfileAttributes: React.FC<Props> = ({ profileUserId }: Props) => {
    return (
        <>
            <View style={{ padding: 3 }}>
                <Chip
                    icon="map-marker"
                    style={{
                        backgroundColor: '#eeeeee',
                    }}
                >
                    Vancouver, BC
                </Chip>
            </View>
            <View style={{ padding: 3 }}>
                <Chip
                    icon="soccer-field"
                    style={{
                        backgroundColor: '#eeeeee',
                    }}
                >
                    Left Wing
                </Chip>
            </View>
            <View style={{ padding: 3 }}>
                <Chip
                    icon="ruler"
                    style={{
                        backgroundColor: '#eeeeee',
                    }}
                >
                    5.8ft
                </Chip>
            </View>
            <View style={{ padding: 3 }}>
                <Chip
                    icon="weight"
                    style={{
                        backgroundColor: '#eeeeee',
                    }}
                >
                    130lbs
                </Chip>
            </View>
            <View style={{ padding: 3 }}>
                <Chip
                    icon="foot-print"
                    style={{
                        backgroundColor: '#eeeeee',
                    }}
                >
                    Right
                </Chip>
            </View>
        </>
    );
};

export default ProfileAttributes;
