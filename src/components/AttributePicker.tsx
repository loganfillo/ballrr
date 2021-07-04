import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, TextInput, Button, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GET_PROFILE_ATTRIBUTES } from '../lib/queries';
import { useQuery } from '@apollo/client';

interface InputProps {
    title: string;
    value: string;
    onChange: (text: string) => void;
}

const AttributeInput: React.FC<InputProps> = ({ title, value, onChange }: InputProps) => {
    return (
        <>
            <Text style={{ paddingVertical: 8, color: 'grey' }}>{title}</Text>
            <TextInput
                style={{
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                    paddingVertical: 4,
                }}
                maxLength={50}
                onChangeText={onChange}
                value={value}
            />
        </>
    );
};

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    profileUserId: number;
    onPositionChange: (item: any) => void;
    onLocationChange: (item: any) => void;
    onHeightChange: (item: any) => void;
    onWeightChange: (item: any) => void;
    onFootChange: (item: any) => void;
    onLeagueChange: (item: any) => void;
}

export const AttributePickerModal: React.FC<ModalProps> = ({
    visible,
    onClose,
    profileUserId,
    onPositionChange,
    onLocationChange,
    onHeightChange,
    onWeightChange,
    onFootChange,
    onLeagueChange,
}: ModalProps) => {
    const { loading, error, data, refetch } = useQuery(GET_PROFILE_ATTRIBUTES, {
        variables: { user_id: profileUserId },
    });

    const [location, setLocation] = useState('');
    const [position, setPosition] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [foot, setFoot] = useState('');
    const [league, setLeague] = useState('');

    useEffect(() => {
        async function fetchAttributes() {
            if (!loading && !error) {
                if (data.users[0].location !== null) setLocation(data.users[0].location);
                if (data.users[0].position !== null) setPosition(data.users[0].position);
                if (data.users[0].height !== null) setHeight(data.users[0].height);
                if (data.users[0].weight !== null) setWeight(data.users[0].weight);
                if (data.users[0].foot !== null) setFoot(data.users[0].foot);
                if (data.users[0].league !== null) setLeague(data.users[0].league);
            }
        }
        fetchAttributes();
    }, [data]);

    function exitModal() {
        onLocationChange(location);
        onPositionChange(position);
        onHeightChange(height);
        onWeightChange(weight);
        onFootChange(foot);
        onLeagueChange(league);
        onClose();
    }

    return (
        <Modal visible={visible}>
            <SafeAreaView>
                <StatusBar hidden />
                <View
                    style={{
                        backgroundColor: 'ghostwhite',
                        padding: 5,
                        alignItems: 'flex-end',
                    }}
                >
                    <Button title={'Done'} onPress={exitModal} />
                </View>

                <View
                    style={{
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'lightgrey',
                    }}
                ></View>
                <View style={{ padding: 15 }}>
                    <AttributeInput
                        title={'Location'}
                        value={location}
                        onChange={(text) => setLocation(text)}
                    />
                    <AttributeInput
                        title={'Positon'}
                        value={position}
                        onChange={(text) => setPosition(text)}
                    />
                    <AttributeInput
                        title={'Height'}
                        value={height}
                        onChange={(text) => setHeight(text)}
                    />
                    <AttributeInput
                        title={'Weight'}
                        value={weight}
                        onChange={(text) => setWeight(text)}
                    />
                    <AttributeInput
                        title={'Foot'}
                        value={foot}
                        onChange={(text) => setFoot(text)}
                    />
                    <AttributeInput
                        title={'League'}
                        value={league}
                        onChange={(text) => setLeague(text)}
                    />
                </View>
            </SafeAreaView>
        </Modal>
    );
};
