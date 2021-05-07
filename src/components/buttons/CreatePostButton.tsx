import React, { useEffect, useState } from 'react';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Media } from '../../lib/types';
import { chooseMedia, createThumbnail, takeMedia } from '../../lib/media';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const OPEN_CAMERA = 'Open Camera';
const CHOOSE_FROM_LIBRARY = 'Choose From Library';
const CANCEL = 'Cancel';

const BUTTONS = [OPEN_CAMERA, CHOOSE_FROM_LIBRARY, CANCEL];

interface Props {
    size: number;
    icon: string;
    iconColor: string;
    compId?: number;
}

const CreatePostButton: React.FC<Props> = ({ size, icon, iconColor, compId }: Props) => {
    const [clicked, setClicked] = useState<string>();

    const navigation = useNavigation();
    const { showActionSheetWithOptions } = useActionSheet();

    async function handleMedia(pickFunc: () => Promise<Media>) {
        const media: Media = await pickFunc();
        if (!media.cancelled) {
            const thumbnail: Media = await createThumbnail(media);
            if (!thumbnail.cancelled && thumbnail.file) {
                const competitionId = compId === undefined ? 0 : compId;
                navigation.navigate('Post', {
                    screen: 'CreatePost',
                    params: { media, thumbnail, competitionId },
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
        <TouchableOpacity
            onPress={() => {
                showActionSheetWithOptions(
                    {
                        destructiveColor: 'red',
                        options: BUTTONS,
                        cancelButtonIndex: BUTTONS.length - 1,
                    },
                    (buttonIndex) => {
                        setClicked(BUTTONS[buttonIndex]);
                    },
                );
            }}
        >
            <MaterialCommunityIcons name={icon} size={size} color={iconColor} />
        </TouchableOpacity>
    );
};

export default CreatePostButton;
