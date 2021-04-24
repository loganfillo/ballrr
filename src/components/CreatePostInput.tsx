import React from 'react';
import { View, Dimensions, Switch } from 'react-native';
import { Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
    title: string | React.ReactNode;
    icon: string;
    iconColor?: string;
    hasButton?: boolean;
    button?: React.ReactNode;
    hasSwitch?: boolean;
    onSwitchChange?: (value: boolean) => void;
    switchTrackColor?: string;
    switchValue?: boolean;
}
const CreatePostInput: React.FC<Props> = ({
    title,
    icon,
    iconColor,
    hasButton,
    button,
    hasSwitch,
    onSwitchChange: onSwitch,
    switchTrackColor,
    switchValue,
}: Props) => {
    const { width } = Dimensions.get('window');

    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', paddingRight: 5 }}>
                    <MaterialCommunityIcons
                        name={icon}
                        size={0.06 * width}
                        color={iconColor || 'black'}
                    />
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-start' }}>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '300',
                            }}
                        >
                            {title}
                        </Text>
                        {hasButton && button}
                    </View>
                </View>
                {hasSwitch && (
                    <Switch
                        style={{ flex: 1 }}
                        onValueChange={onSwitch}
                        value={switchValue}
                        trackColor={{ true: switchTrackColor || 'green', false: 'lightgrey' }}
                    ></Switch>
                )}
            </View>
        </View>
    );
};

export default CreatePostInput;
