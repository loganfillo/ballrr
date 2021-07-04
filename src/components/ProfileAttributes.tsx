import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';
import { GET_PROFILE_ATTRIBUTES } from '../lib/queries';
import { useQuery } from '@apollo/client';

interface Props {
    profileUserId: number;
    refetchAttributes: boolean;
}

const ProfileAttributes: React.FC<Props> = ({ profileUserId, refetchAttributes }: Props) => {
    const [position, setPosition] = useState('');
    const [location, setLocation] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [foot, setFoot] = useState('');
    const [league, setLeague] = useState('');

    const { loading, error, data, refetch } = useQuery(GET_PROFILE_ATTRIBUTES, {
        variables: { user_id: profileUserId },
    });

    useEffect(() => {
        async function fetchAttributes() {
            if (!loading && !error) {
                console.log(data.users[0]);
                if (data.users[0].location !== null) setLocation(data.users[0].location);
                if (data.users[0].position !== null) setPosition(data.users[0].position);
                if (data.users[0].height !== null) setHeight(data.users[0].height);
                if (data.users[0].weight !== null) setWeight(data.users[0].weight);
                if (data.users[0].foot !== null) setFoot(data.users[0].foot);
                if (data.users[0].league !== null) setLeague(data.users[0].league);
            }
        }
        fetchAttributes();
        refetch();
    }, [data, refetchAttributes]);

    return (
        <>
            {location != '' ? (
                <View style={{ padding: 3 }}>
                    <Chip
                        icon="map-marker"
                        style={{
                            backgroundColor: '#eeeeee',
                        }}
                    >
                        {location}
                    </Chip>
                </View>
            ) : null}

            {position != '' ? (
                <View style={{ padding: 3 }}>
                    <Chip
                        icon="soccer-field"
                        style={{
                            backgroundColor: '#eeeeee',
                        }}
                    >
                        {position}
                    </Chip>
                </View>
            ) : null}
            {height != '' ? (
                <View style={{ padding: 3 }}>
                    <Chip
                        icon="ruler"
                        style={{
                            backgroundColor: '#eeeeee',
                        }}
                    >
                        {height}
                    </Chip>
                </View>
            ) : null}
            {weight != '' ? (
                <View style={{ padding: 3 }}>
                    <Chip
                        icon="weight"
                        style={{
                            backgroundColor: '#eeeeee',
                        }}
                    >
                        {weight}
                    </Chip>
                </View>
            ) : null}
            {foot != '' ? (
                <View style={{ padding: 3 }}>
                    <Chip
                        icon="foot-print"
                        style={{
                            backgroundColor: '#eeeeee',
                        }}
                    >
                        {foot}
                    </Chip>
                </View>
            ) : null}
            {league != '' ? (
                <View style={{ padding: 3 }}>
                    <Chip
                        icon="passport"
                        style={{
                            backgroundColor: '#eeeeee',
                        }}
                    >
                        {league}
                    </Chip>
                </View>
            ) : null}
        </>
    );
};

export default ProfileAttributes;
