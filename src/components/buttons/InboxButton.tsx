import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NotificationBadge from '../NotificationBadge';
import { Dimensions, TouchableOpacity } from 'react-native';

const InboxButton: React.FC = () => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');

    function navigateNotifications() {
        navigation.navigate('Notifications');
    }
    return (
        <NotificationBadge
            icon={
                <TouchableOpacity style={{ padding: 10 }} onPress={navigateNotifications}>
                    <MaterialCommunityIcons name={'inbox'} size={0.08 * width} />
                </TouchableOpacity>
            }
            top={0.03 * width}
            right={0.03 * width}
        />
    );
};

export default InboxButton;
