import { TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { ActionSheet, Text, View } from 'native-base';
import { Media } from '../../lib/types';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { chooseMedia, takeMedia } from '../../lib/media';
import { useNavigation } from '@react-navigation/native';

const PLACEHOLDER_IMAGE =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Soccerball.svg/1200px-Soccerball.svg.png';

const OPEN_CAMERA = 'Open Camera';
const CHOOSE_FROM_LIBRARY = 'Choose From Library';
const CANCEL = 'Cancel';

const BUTTONS = [OPEN_CAMERA, CHOOSE_FROM_LIBRARY, CANCEL];

const CreatePostButton: React.FC = () => {
    const [clicked, setClicked] = useState<string>();

    const navigation = useNavigation();

    async function handleMedia(pickFunc: () => Promise<Media>) {
        const media: Media = await pickFunc();
        if (!media.cancelled) {
            const thumbnailUri = await getThumbnailUri(media);
            navigation.navigate('Post', {
                screen: 'CreatePost',
                params: { media, thumbnailUri },
            });
        }
    }

    async function getThumbnailUri(media: Media): Promise<string> {
        let thumbnailUri: string = PLACEHOLDER_IMAGE;
        try {
            let imageUri = media.uri;
            if (!media.file?.type.includes('image')) {
                const { uri } = await VideoThumbnails.getThumbnailAsync(media.uri ?? '', {
                    time: 15000,
                });
                imageUri = uri;
            }
            if (imageUri !== undefined) {
                thumbnailUri = imageUri;
            }
        } catch (e) {
            console.log(e);
        }
        return thumbnailUri;
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
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => {
                    ActionSheet.show(
                        {
                            options: BUTTONS,
                            cancelButtonIndex: BUTTONS.length,
                        },
                        (buttonIndex) => {
                            setClicked(BUTTONS[buttonIndex]);
                        },
                    );
                }}
                style={styles.button}
            >
                <View style={styles.iconContainer}>
                    <AntDesign name="plus" size={32} color={'green'} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: { flex: 1, backgroundColor: 'white' },
    button: {
        flex: 1,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'green',
        backgroundColor: 'white',
        padding: 2,
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 6,
        marginRight: 6,
    },
    iconContainer: { justifyContent: 'center', alignSelf: 'center' },
});

export default CreatePostButton;
