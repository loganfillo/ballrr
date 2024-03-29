import { Storage } from 'aws-amplify';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform } from 'react-native';
import { Media, UploadedMedia, MediaFile, MediaType } from './types';
import uuid from 'uuid-random';
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as ImageManipulator from 'expo-image-manipulator';

/**
 * Opens camera and allows user to take media to upload. Returns the media
 * with the cancelled property set accordingly
 */
export async function takeMedia(): Promise<Media> {
    const media: Media = {
        cancelled: true,
    };

    const hasPerms = await getPermissions();

    if (hasPerms) {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            videoMaxDuration: 30,
        });

        if (!result.cancelled) {
            const file: MediaFile | null = await constructMediaFile(
                result.uri,
                result.type as MediaType,
            );
            if (file !== null) {
                media.cancelled = false;
                media.file = file;
                media.type = result.type as MediaType;
            }
        }
    }
    return media;
}

/**
 * Opens media library and allows user to take media to upload. Returns the media
 * with the cancelled property set accordingly
 */
export async function chooseMedia(): Promise<Media> {
    const media: Media = {
        cancelled: true,
    };

    const hasPerms = await getPermissions();

    if (hasPerms) {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            videoMaxDuration: 30,
        });

        if (!result.cancelled) {
            const file: MediaFile | null = await constructMediaFile(
                result.uri,
                result.type as MediaType,
            );
            if (file !== null) {
                media.cancelled = false;
                media.file = file;
                media.type = result.type as MediaType;
            }
        }
    }

    return media;
}

/**
 * Uploads the media to AWS S3 and returns the uploaded media URL
 * if the upload was attempted and successful
 *
 * @param media The media to upload
 */
export async function uploadMediaToS3(media: Media): Promise<UploadedMedia> {
    const uploadedMedia: UploadedMedia = {
        ok: false,
    };
    try {
        if (media.file !== undefined) {
            const blob = await uriToBlob(media.file.uri);
            const key = await getRandomS3Key(media.file.extension);
            await Storage.put(key, blob, {
                contentType: media.file.type,
                level: 'public',
            });
            const url = await Storage.get(key);
            uploadedMedia.ok = true;
            uploadedMedia.url = url as string;
            uploadedMedia.name = key;
            uploadedMedia.type = media.type;
        }
    } catch (e) {
        console.log(e);
        Alert.alert('S3 upload failed');
    }
    return uploadedMedia;
}

/**
 * Deletes media from AWS S3 and returns a promise.
 * Logs error if delete was not successful
 *
 * @param s3Key The key to the S3 media to delete
 */
export async function deleteFromS3(s3Key: string): Promise<void> {
    try {
        await Storage.remove(s3Key);
    } catch (e) {
        console.log('Failed to delete media from S3. Error: \n', e);
    }
}

/**
 * Creates a thumbnail image from a media
 *
 * @param media The media to create a thumbnail from
 * @returns The media object for the thumbnail image
 */
export async function createThumbnail(media: Media): Promise<Media> {
    const thumbnailMedia: Media = { cancelled: true };
    try {
        let thumbnailUri: string | null = null;
        if (media.file && media.type === MediaType.VIDEO) {
            const { uri, height, width } = await VideoThumbnails.getThumbnailAsync(media.file.uri, {
                time: 15000,
            });
            if (uri !== undefined) {
                thumbnailUri = await resizeAndFormatThumbnail(uri, height / 3, width / 3);
            }
        } else if (media.file && media.type === MediaType.IMAGE) {
            thumbnailUri = await resizeAndFormatThumbnail(media.file.uri, 300, 300);
        }
        if (thumbnailUri !== null) {
            const file: MediaFile | null = await constructMediaFile(thumbnailUri, MediaType.IMAGE);
            if (file !== null) {
                thumbnailMedia.cancelled = false;
                thumbnailMedia.type = MediaType.IMAGE;
                thumbnailMedia.file = file;
            }
        }
    } catch (e) {
        console.log(e);
    }

    return thumbnailMedia;
}

/**
 * Constructs a media file object from uri and type, returns null if error occured
 *
 * @param uri Local file Uri
 * @param mediaType Media type
 */
async function constructMediaFile(uri: string, mediaType: MediaType): Promise<MediaFile | null> {
    const extension: string | null = extensionFromURI(uri);
    if (extension === null) {
        return null;
    }
    const type: string | null = mimeTypeFromMediaType(mediaType);
    if (type === null) {
        return null;
    }

    return { type, uri, extension };
}

/**
 * Resizes and formats a image to be a small jpeg thumbnail image
 *
 * @param imageUri The image uri to resize
 * @returns The local uri of the resized image
 */
async function resizeAndFormatThumbnail(
    imageUri: string,
    height: number,
    width: number,
): Promise<string> {
    const { uri } = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { height, width } }],
        {
            compress: 1,
            format: ImageManipulator.SaveFormat.JPEG,
        },
    );
    return uri;
}

/**
 * Gets the extension of a file from the file's URI, returns null if the
 * type cannot be parsed from the URI
 *
 * @param uri The data URI or local file URI
 */
function extensionFromURI(uri: string): string | null {
    const filename = uri.split('/').pop();
    if (filename !== undefined) {
        const matches = /\.(\w+)$/.exec(filename);
        if (matches !== null) {
            return matches[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
}

/**
 * Determines the mime of a file given its type, returns null
 * if type is not image or video
 *
 * @param type Media type (image or video), undefined if not given in
 *              image picker result
 */
function mimeTypeFromMediaType(type: string | undefined): string | null {
    if (type === 'image') {
        return 'image/jpeg';
    } else if (type === 'video') {
        return 'video/quicktime';
    }
    return null;
}

/**
 * Returns an unused random file name
 *
 * @param extension File extension (i.e jpg)
 * @returns A random file name with the given extension
 */
async function getRandomS3Key(extension: string): Promise<string> {
    let keyAlreadyExists = false;
    let randomIdentifier = '';
    let key = '';
    do {
        randomIdentifier = uuid();
        key = `${randomIdentifier}.${extension}`;
        keyAlreadyExists = await checkAlreadyExists(key);
    } while (keyAlreadyExists);
    return key;
}

/**
 * Helper for checking if a file with given key exists in s3 already
 *
 * @param key s3 bucket key
 * @returns True if it does exists, false if not
 */
async function checkAlreadyExists(key: string) {
    const files = await Storage.list('');
    for (const file of files) {
        if (file.key === key) {
            return true;
        }
    }
    return false;
}

/**
 * Gets the blob of the given file
 *
 * @param uri local file uri
 * @returns The blob of the file
 */
function uriToBlob(uri: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onerror = reject;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                resolve(xhr.response);
            }
        };
        xhr.open('GET', uri);
        xhr.responseType = 'blob'; // convert type
        xhr.send();
    });
}

/**
 * Helper for getting permissions needed for media
 *
 * @returns True if all required permissions were gotten, otherwise returns false
 */
async function getPermissions(): Promise<boolean> {
    if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Sorry, we need camera roll permissions to make this work!');
            return false;
        } else {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Sorry, we need camera roll permissions to make this work!');
                return false;
            }
        }
    }
    return true;
}
