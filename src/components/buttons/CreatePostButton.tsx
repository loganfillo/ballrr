import { TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActionSheet, View } from 'native-base';
import { Media } from '../../lib/types';
import { chooseMedia, createThumbnail, takeMedia } from '../../lib/media';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';

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
                    <IconButton color="green" icon="plus" size={25} />
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
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 10,
        marginRight: 10,
    },
    iconContainer: { flex: 1, justifyContent: 'center', alignSelf: 'center' },
});

export default CreatePostButton;
