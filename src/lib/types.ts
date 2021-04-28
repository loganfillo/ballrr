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
    username: string;
    updateLoginStatus: (isUserLoggedIn: boolean) => void;
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
    file?: MediaFile;
    type?: MediaType;
}

export interface MediaFile {
    uri: string;
    type: string;
    extension: string;
}

export interface Post {
    userId: number;
    profPicUrl: string;
    fullName: string;
    username: string;
    url: string;
    caption: string;
    type: MediaType;
    id: number;
    s3Key: string;
    thumbnailS3Key: string;
}

export interface ProfilePost {
    url: string;
    id: number;
}

export interface Challenge {
    posterUri: string;
    type: string;
    title: string;
    userCount: number;
}

export interface SearchResult {
    username: string;
    fullName: string;
    userId: number;
    profPicUrl: string;
}

export interface Follower {
    username: string;
    fullName: string;
    userId: number;
    profPicUrl: string;
}

export interface Following {
    username: string;
    fullName: string;
    userId: number;
    profPicUrl: string;
}

export enum NotificationType {
    LIKE = 'like',
}

export interface Notification {
    id: number;
    username: string;
    type: NotificationType;
    seen: boolean;
}

export interface Flag {
    name: string;
    emoji: string;
    noFlag?: boolean;
}
