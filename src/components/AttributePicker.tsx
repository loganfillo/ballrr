import React, { useState } from 'react';
import { Text, SafeAreaView, View, TextInput, Button, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';

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

interface PickerProps {
    onSave: (item: any) => void;
}

const AttributePicker: React.FC<PickerProps> = ({ onSave }: PickerProps) => {
    const [location, setLocation] = useState('');

    return (
        <View style={{ padding: 15 }}>
            <AttributeInput
                title={'Location'}
                value={location}
                onChange={(text) => setLocation(text)}
            />
        </View>
    );
};

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    onFlagChange: (item: any) => void;
}

export const AttributePickerModal: React.FC<ModalProps> = ({
    visible,
    onClose,
    onFlagChange,
}: ModalProps) => {
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
                    <Button title={'Cancel'} onPress={onClose} />
                </View>

                <View
                    style={{
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'lightgrey',
                    }}
                ></View>
                <AttributePicker onSave={onFlagChange} />
            </SafeAreaView>
        </Modal>
    );
};
