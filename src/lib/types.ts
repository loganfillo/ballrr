export interface Text {
    HOME: string;
    EXPLORE: string;
    EVENTS: string;
    ABOUT: string;
    LOGIN: string;
    WELCOME_MESSAGE: string;
}

export interface LocaleMap {
    [key: string]: Text;
    en: Text;
    es: Text;
    fr: Text;
    gr: Text;
}

export interface Localization {
    locale: string;
    text: Text | unknown;
}

export interface User {
    id: number;
}

export enum MediaType {
    IMAGE = 'image',
    VIDEO = 'video',
}

export interface UploadedMedia {
    ok: boolean;
    url?: string;
    name?: string;
    type?: MediaType;
}

export interface Media {
    cancelled: boolean;
    uri?: string;
    file?: MediaFile;
    type?: MediaType;
}

export interface MediaFile {
    uri: string;
    type: string;
    extension: string;
}

export interface Post {
    fullName: string;
    username: string;
    url: string;
    caption: string;
    type: MediaType;
}

export interface ProfilePost {
    url: string;
    id: number;
}
