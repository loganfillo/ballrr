import React, { useEffect, useState } from 'react';
import {
    Text,
    SafeAreaView,
    View,
    TouchableOpacity,
    Modal,
    Button,
    VirtualizedList,
} from 'react-native';
import { Flag } from '../lib/types';
import flags from '../lib/flags';
import { StatusBar } from 'expo-status-bar';
import { Searchbar } from 'react-native-paper';

interface PickerProps {
    searchQuery: string;
    onSelect: (item: Flag) => void;
}

const FlagPicker: React.FC<PickerProps> = ({ searchQuery, onSelect }: PickerProps) => {
    const [flagList, setFlagList] = useState<Flag[]>(flags);

    function selectFlag(item: Flag) {
        onSelect(item);
    }

    useEffect(() => {
        console.log(
            flags.filter((flag) => {
                return flag.name.toUpperCase().startsWith(searchQuery.toUpperCase());
            }),
        );
        setFlagList(
            flags.filter((flag) => {
                return flag.name.toUpperCase().startsWith(searchQuery.toUpperCase());
            }),
        );
    }, [searchQuery]);

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

    return (
        <VirtualizedList
            getItemCount={() => flagList.length}
            initialNumToRender={10}
            getItem={(data, index) => data[index]}
            data={flagList}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
        />
    );
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
    const [searchQuery, setSearchQuery] = useState('');

    function updateSearchQuery(query: string) {
        setSearchQuery(query);
    }

    return (
        <Modal visible={visible}>
            <SafeAreaView>
                <StatusBar hidden />
                <View
                    style={{
                        backgroundColor: 'ghostwhite',
                        padding: 10,
                        flexDirection: 'row',
                    }}
                >
                    <Searchbar
                        style={{ flex: 6 }}
                        placeholder="Search"
                        onChangeText={updateSearchQuery}
                        value={searchQuery}
                    />
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Button title={'Cancel'} onPress={onClose} />
                    </View>
                </View>

                <View
                    style={{
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'lightgrey',
                    }}
                ></View>
                <FlagPicker onSelect={onFlagChange} searchQuery={searchQuery} />
            </SafeAreaView>
        </Modal>
    );
};
