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
    mutation createPost($user_id: Int!, $caption: String!) {
        insert_posts_one(object: { user_id: $user_id, caption: $caption }) {
            id
        }
    }
`;

export const GET_USERS_POSTS = gql`
    query getUsersPosts($user_id: Int!) {
        posts(where: { user_id: { _eq: $user_id } }, order_by: { created_at: desc }) {
            id
            media {
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
            media {
                s3_key
                type
            }
            id
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

export const CREATE_POST_MEDIA = gql`
    mutation createPostMedia($type: media_type_enum!, $s3_key: String!, $postID: Int!) {
        insert_post_media_one(object: { type: $type, s3_key: $s3_key, post_id: $postID }) {
            id
        }
    }
`;

export const DELETE_POST = gql`
    mutation deletePost($id: Int!) {
        delete_posts_by_pk(id: $id) {
            id
        }
    }
`;

export const LIKE_POST = gql`
    mutation likePost($post_id: Int, $user_id: Int = 10) {
        insert_post_likes_one(
            object: { user_id: $user_id, liked_post_id: $post_id, notification_seen: false }
        ) {
            id
        }
    }
`;

export const GET_LIKES = gql`
    query getLikes($user_id: Int) {
        post_likes(
            where: {
                liked_post: { post_user_id: { id: { _eq: $user_id } } }
                _and: { user_id: { _neq: $user_id } }
            }
        ) {
            id
            user_id
            notification_seen
        }
    }
`;

export const COUNT_UNSEEN_LIKES = gql`
    query countUnseenLikes($user_id: Int!) {
        post_likes_aggregate(
            where: {
                notification_seen: { _eq: false }
                _and: {
                    liked_post: { post_user_id: { id: { _eq: $user_id } } }
                    _and: { user_id: { _neq: $user_id } }
                }
            }
        ) {
            aggregate {
                count
            }
        }
    }
`;

export const DELETE_LIKE = gql`
    mutation deleteLike($user_id: Int, $post_id: Int) {
        delete_post_likes(
            where: { user_id: { _eq: $user_id }, _and: { liked_post_id: { _eq: $post_id } } }
        ) {
            affected_rows
        }
    }
`;

export const HAS_USER_LIKED_POST = gql`
    query hasUserLikedPost($user_id: Int, $post_id: Int) {
        post_likes(
            where: { user_id: { _eq: $user_id }, _and: { liked_post_id: { _eq: $post_id } } }
        ) {
            id
        }
    }
`;

export const UPDATE_LIKES_SEEN = gql`
    mutation updateLikesSeen($like_ids: [Int!]) {
        update_post_likes(where: { id: { _in: $like_ids } }, _set: { notification_seen: true }) {
            returning {
                id
            }
            affected_rows
        }
    }
`;
