import React from 'react';
import { View } from 'react-native';
import { Badge } from 'react-native-paper';

interface Props {
    icon: React.ReactChild;
    top: number;
    right: number;
}

const NotificationBadge: React.FC<Props> = ({ icon, top, right }: Props) => {
    return (
        <View>
            <Badge
                visible={true}
                style={{ position: 'absolute', top, right, zIndex: 100 }}
                size={18}
            >
                3
            </Badge>
            {icon}
        </View>
    );
};

export default NotificationBadge;
