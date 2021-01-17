import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
    query getProfile($user_id: String!) {
        users(where: { user_id: { _eq: $user_id } }) {
            full_name
            username
            profile_pic {
                s3_url
            }
        }
    }
`;

export const CREATE_POST = gql`
    mutation createPost($user_id: Int!, $caption: String!, $media_id: Int!) {
        insert_posts_one(object: { user_id: $user_id, caption: $caption, media_id: $media_id }) {
            id
        }
    }
`;

export const GET_USERS_POSTS = gql`
    query getUsersPosts($user_id: Int!) {
        posts(where: { user_id: { _eq: $user_id } }, order_by: { created_at: desc }) {
            id
            post_content {
                s3_key
                type
            }
        }
    }
`;

export const GET_ALL_POSTS = gql`
    query getAllPosts {
        posts(order_by: { created_at: desc }) {
            caption
            post_user_id {
                username
                full_name
            }
            post_content {
                s3_key
                type
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($user_id: String!) {
        insert_users_one(
            on_conflict: { constraint: users_user_id_key, update_columns: [] }
            object: { user_id: $user_id }
        ) {
            id
        }
    }
`;

export const GET_USER = gql`
    query getUser($user_id: String!) {
        users(where: { user_id: { _eq: $user_id } }) {
            id
        }
    }
`;

export const CREATE_MEDIA = gql`
    mutation createMedia($type: media_type_enum!, $s3_key: String!) {
        insert_media_one(object: { type: $type, s3_key: $s3_key }) {
            id
        }
    }
`;
