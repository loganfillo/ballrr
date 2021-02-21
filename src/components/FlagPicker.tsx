import React from 'react';
import { Text, SafeAreaView, View, FlatList, TouchableOpacity, Modal, Button } from 'react-native';
import { Flag } from '../lib/types';
import flags from '../lib/flags';
import { StatusBar } from 'expo-status-bar';

interface PickerProps {
    onSelect: (item: Flag) => void;
}

const FlagPicker: React.FC<PickerProps> = ({ onSelect }: PickerProps) => {
    function selectFlag(item: Flag) {
        onSelect(item);
    }

    function renderItem({ item }: { item: Flag }) {
        return (
            <TouchableOpacity onPress={() => selectFlag(item)}>
                <View
                    style={{
                        flexDirection: 'row',
                        padding: 10,
                    }}
                >
                    <Text style={{ fontSize: 18 }}>
                        {item.emoji}
                        {item.name}
                    </Text>
                </View>
                <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'grey' }}></View>
            </TouchableOpacity>
        );
    }

    return <FlatList data={flags} renderItem={renderItem} keyExtractor={(item) => item.name} />;
};

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    onFlagChange: (flag: Flag) => void;
}

export const FlagPickerModal: React.FC<ModalProps> = ({
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
                <FlagPicker onSelect={onFlagChange} />
            </SafeAreaView>
        </Modal>
    );
};
