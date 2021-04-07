import React, { useEffect, useState } from 'react';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Media } from '../lib/types';
import { chooseMedia, createThumbnail, takeMedia } from '../lib/media';
import { useNavigation } from '@react-navigation/native';
import TabIcon from './TabIcon';
import { View } from 'native-base';

const OPEN_CAMERA = 'Open Camera';
const CHOOSE_FROM_LIBRARY = 'Choose From Library';
const CANCEL = 'Cancel';

const BUTTONS = [OPEN_CAMERA, CHOOSE_FROM_LIBRARY, CANCEL];

interface Props {
    size: number;
}

const CreatePostButton: React.FC<Props> = ({ size }: Props) => {
    const [clicked, setClicked] = useState<string>();

    const navigation = useNavigation();
    const { showActionSheetWithOptions } = useActionSheet();

    async function handleMedia(pickFunc: () => Promise<Media>) {
        const media: Media = await pickFunc();
        if (!media.cancelled) {
            const thumbnail: Media = await createThumbnail(media);
            if (!thumbnail.cancelled && thumbnail.file) {
                navigation.navigate('Post', {
                    screen: 'CreatePost',
                    params: { media, thumbnail },
                });
            }
        }
    }

    useEffect(() => {
        async function handleActionButton() {
            if (clicked === OPEN_CAMERA) {
                await handleMedia(takeMedia);
            } else if (clicked === CHOOSE_FROM_LIBRARY) {
                await handleMedia(chooseMedia);
            }
            setClicked(CANCEL);
        }
        handleActionButton();
    }, [clicked]);

    return (
        <View
            style={{
                backgroundColor: 'white',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderLeftWidth: 7,
                borderLeftColor: '#1bb51d',
                borderRightColor: '#1bb51d',
                borderRightWidth: 7,
                borderRadius: 10,
                borderTopColor: '#1bb51d',
                borderBottomColor: '#1bb51d',
                margin: -7,
            }}
        >
            <TabIcon
                name={'plus'}
                size={size}
                color={'#1bb51d'}
                onPress={() => {
                    showActionSheetWithOptions(
                        {
                            options: BUTTONS,
                            cancelButtonIndex: BUTTONS.length,
                        },
                        (buttonIndex) => {
                            setClicked(BUTTONS[buttonIndex]);
                        },
                    );
                }}
            />
        </View>
    );
};

export default CreatePostButton;
