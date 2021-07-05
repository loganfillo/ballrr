import { gql } from '@apollo/client';

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
            thumbnail {
                s3_key
            }
        }
    }
`;

export const GET_USERS_MEDIA = gql`
    query getUsersPosts($user_id: Int!) {
        posts(where: { user_id: { _eq: $user_id } }) {
            id
            thumbnail {
                id
                s3_key
            }
            media {
                id
                s3_key
            }
        }
        users(where: { id: { _eq: $user_id } }) {
            id
            profile_pic {
                id
                s3_key
            }
        }
    }
`;

export const COUNT_USERS_POST = gql`
    query countPosts($user_id: Int!) {
        posts_aggregate(where: { user_id: { _eq: $user_id } }) {
            aggregate {
                count
            }
        }
    }
`;

export const GET_POSTS = gql`
    query getPosts($post_ids: [Int!] = null) {
        posts(order_by: { created_at: desc }, where: { id: { _in: $post_ids } }) {
            user_id
            caption
            post_user_id {
                username
                full_name
                profile_pic {
                    s3_key
                }
            }
            media {
                s3_key
                type
            }
            id
            thumbnail {
                s3_key
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($user_id: String!, $username: String!) {
        insert_users_one(
            on_conflict: { constraint: users_user_id_key, update_columns: [] }
            object: { user_id: $user_id, username: $username }
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

export const UPDATE_USER = gql`
    mutation updateUser($user_id: Int!, $bio: String!, $name: String!, $flag: String!) {
        update_users_by_pk(
            pk_columns: { id: $user_id }
            _set: { bio: $bio, full_name: $name, flag: $flag }
        ) {
            id
        }
    }
`;

export const CREATE_POST_MEDIA = gql`
    mutation createPostMedia($type: media_type_enum!, $s3_key: String!, $post_id: Int!) {
        insert_post_media_one(object: { type: $type, s3_key: $s3_key, post_id: $post_id }) {
            id
        }
    }
`;

export const CREATE_THUMBNAIL_MEDIA = gql`
    mutation createThumbnailMedia($s3_key: String!, $post_id: Int!) {
        insert_thumbnail_media_one(object: { s3_key: $s3_key, post_id: $post_id }) {
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

export const DELETE_USER = gql`
    mutation deleteUser($user_id: Int!) {
        delete_users(where: { id: { _eq: $user_id } }) {
            affected_rows
        }
    }
`;

export const SEARCH_USERS = gql`
    query searchUsers($search_query: String!) {
        users(where: { username: { _ilike: $search_query } }) {
            username
            full_name
            id
            profile_pic {
                s3_key
            }
        }
    }
`;

export const LIKE_POST = gql`
    mutation likePost($post_id: Int!, $user_id: Int!) {
        insert_post_likes_one(object: { user_id: $user_id, liked_post_id: $post_id }) {
            id
        }
        insert_notifications_one(
            object: {
                user_id_of_notifier: $user_id
                liked_post_id: $post_id
                notification_type: "LIKE"
                notification_seen: false
            }
        ) {
            id
        }
    }
`;

export const UPDATE_COMP_SUB_SCORE_LIKES = gql`
    mutation updateCompSubScore($comp_id: Int!, $post_id: Int!, $val: Int!) {
        update_competition_submission(
            where: { comp_id: { _eq: $comp_id }, _and: { post_id: { _eq: $post_id } } }
            _inc: { score: $val }
        ) {
            returning {
                score
            }
        }
    }
`;

export const COUNT_LIKES = gql`
    query countLikes($post_id: Int) {
        post_likes_aggregate(where: { liked_post_id: { _eq: $post_id } }) {
            aggregate {
                count
            }
        }
    }
`;

export const COUNT_COMMENTS = gql`
    query countComments($post_id: Int) {
        comments_aggregate(where: { post_id: { _eq: $post_id } }) {
            aggregate {
                count
            }
        }
    }
`;

export const GET_LIKES = gql`
    query getLikes($user_id: Int!) {
        post_likes(
            where: {
                liked_post: { post_user_id: { id: { _eq: $user_id } } }
                _and: { user_id: { _neq: $user_id } }
            }
        ) {
            id
            notification_seen
            user_id_of_like {
                username
            }
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

export const GET_NOTIFICATIONS = gql`
    query getNotifications($user_id: Int!) {
        notifications(
            where: {
                _or: [
                    { user_followed_id: { _eq: $user_id } }
                    {
                        liked_post: { post_user_id: { id: { _eq: $user_id } } }
                        _and: { notifier_user_id: { id: { _neq: $user_id } } }
                    }
                ]
            }
        ) {
            notification_seen
            notification_type
            notifier_user_id {
                id
                username
                profile_pic {
                    s3_key
                }
            }
            liked_post {
                id
                thumbnail {
                    s3_key
                }
            }
        }
    }
`;

export const COUNT_UNSEEN_NOTIFS = gql`
    query countUnseenLikes($user_id: Int!) {
        notifications(
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
    mutation deleteLike($user_id: Int!, $post_id: Int!) {
        delete_post_likes(
            where: { user_id: { _eq: $user_id }, _and: { liked_post_id: { _eq: $post_id } } }
        ) {
            affected_rows
        }
        delete_notifications(
            where: {
                user_id_of_notifier: { _eq: $user_id }
                _and: {
                    liked_post_id: { _eq: $post_id }
                    _and: { notification_type: { _eq: "LIKE" } }
                }
            }
        ) {
            affected_rows
        }
    }
`;

export const HAS_USER_LIKED_POST = gql`
    query hasUserLikedPost($user_id: Int!, $post_id: Int!) {
        post_likes(
            where: { user_id: { _eq: $user_id }, _and: { liked_post_id: { _eq: $post_id } } }
        ) {
            id
        }
    }
`;

export const UPDATE_NOTIFICATIONS = gql`
    mutation updateNotifications($like_ids: [Int!]) {
        update_notifications(where: { id: { _in: $like_ids } }, _set: { notification_seen: true }) {
            returning {
                id
            }
            affected_rows
        }
    }
`;

export const COUNT_FOLLOWERS = gql`
    query countFollowers($user_id: Int!) {
        followers_aggregate(where: { user_followed_id: { _eq: $user_id } }) {
            aggregate {
                count
            }
        }
    }
`;

export const COUNT_FOLLOWING = gql`
    query countFollowing($user_id: Int!) {
        followers_aggregate(where: { user_id: { _eq: $user_id } }) {
            aggregate {
                count
            }
        }
    }
`;

export const CHECK_IF_FOLLOWING = gql`
    query checkIfFollowing($user_id: Int!, $user_followed_id: Int!) {
        followers(
            where: {
                user_followed: { id: { _eq: $user_followed_id } }
                _and: { user_follower: { id: { _eq: $user_id } } }
            }
        ) {
            id
        }
    }
`;

export const FOLLOW_USER = gql`
    mutation followUser($user_id: Int!, $user_followed_id: Int!) {
        insert_followers_one(object: { user_id: $user_id, user_followed_id: $user_followed_id }) {
            id
        }
        insert_notifications_one(
            object: {
                user_id_of_notifier: $user_id
                user_followed_id: $user_followed_id
                notification_type: "FOLLOW"
                notification_seen: false
            }
        ) {
            id
        }
    }
`;

export const UNFOLLOW_USER = gql`
    mutation unfollowUser($user_id: Int!, $user_followed_id: Int!) {
        delete_followers(
            where: {
                user_followed: { id: { _eq: $user_followed_id } }
                _and: { user_follower: { id: { _eq: $user_id } } }
            }
        ) {
            affected_rows
        }
        delete_notifications(
            where: {
                user_id_of_notifier: { _eq: $user_id }
                _and: {
                    user_followed_id: { _eq: $user_followed_id }
                    _and: { notification_type: { _eq: "FOLLOW" } }
                }
            }
        ) {
            affected_rows
        }
    }
`;

export const GET_PROFILE = gql`
    query getProfile($user_id: Int!) {
        users_by_pk(id: $user_id) {
            bio
            full_name
            id
            username
            flag
            profile_pic {
                s3_key
            }
        }
    }
`;

export const GET_FOLLOWERS = gql`
    query getFollowers($user_id: Int!) {
        followers(where: { user_followed_id: { _eq: $user_id } }) {
            user_follower {
                id
                username
                full_name
                profile_pic {
                    s3_key
                }
            }
        }
    }
`;

export const GET_FOLLOWING = gql`
    query getFollowing($user_id: Int!) {
        followers(where: { user_id: { _eq: $user_id } }) {
            user_followed {
                id
                username
                full_name
                profile_pic {
                    s3_key
                }
            }
        }
    }
`;

export const CREATE_PROFILE_PIC_MEDIA = gql`
    mutation createProfilePicMedia($s3_key: String!, $user_id: Int!) {
        insert_profile_pic_media_one(object: { s3_key: $s3_key, user_id: $user_id }) {
            id
        }
    }
`;

export const DELETE_PROFILE_PIC_MEDIA = gql`
    mutation deleteProfilePicMedia($user_id: Int!) {
        delete_profile_pic_media(where: { user_id: { _eq: $user_id } }) {
            affected_rows
        }
    }
`;

export const CREATE_COMPETITION = gql`
    mutation createCompetition(
        $description: String!
        $name: String!
        $post_id: Int!
        $user_id: Int!
        $time_limit: Int
        $creator_score: Int
        $leaderboard_type: leaderboard_type_enum
    ) {
        insert_competitions_one(
            object: {
                name: $name
                description: $description
                post_id: $post_id
                user_id: $user_id
                time_limit: $time_limit
                creator_score: $creator_score
                leaderboard_type: $leaderboard_type
            }
        ) {
            id
        }
    }
`;

export const CREATE_COMPETITION_SUBMISSION = gql`
    mutation createCompSubmission($comp_id: Int!, $post_id: Int!, $score: Int!) {
        insert_competition_submission_one(
            object: { comp_id: $comp_id, post_id: $post_id, score: $score }
        ) {
            id
        }
    }
`;

export const GET_POST_COMPETITION = gql`
    query getCompetitionThumbnail($post_id: Int!) {
        competition_submission_aggregate(where: { post_id: { _eq: $post_id } }) {
            aggregate {
                count
            }
            nodes {
                competition {
                    id
                    leaderboard_type
                }
                score
            }
        }
    }
`;

export const GET_COMPETITION_THUMBNAIL = gql`
    query getCompThumbnail($comp_id: Int!) {
        competitions_by_pk(id: $comp_id) {
            post {
                thumbnail {
                    s3_key
                }
            }
            id
        }
    }
`;

export const GET_COMPETITION = gql`
    query getCompetition($comp_id: Int!) {
        competitions_by_pk(id: $comp_id) {
            creator_score
            description
            leaderboard_type
            name
            time_limit
            id
        }
    }
`;

export const GET_COMPETITION_SUBMISSION_COUNT = gql`
    query getCompSubmissionCount($comp_id: Int!) {
        competition_submission_aggregate(where: { comp_id: { _eq: $comp_id } }) {
            aggregate {
                count
            }
        }
    }
`;

export const GET_COMPETITION_SUBMISSIONS = gql`
    query getCompSubmissionThumb($comp_id: Int!) {
        competition_submission(
            where: { comp_id: { _eq: $comp_id } }
            order_by: { post: { created_at: desc } }
        ) {
            post {
                id
                thumbnail {
                    s3_key
                }
            }
        }
    }
`;

export const GET_COMPETITION_LEADERBOARD = gql`
    query getLikesList($comp_id: Int!) {
        competition_submission(where: { comp_id: { _eq: $comp_id } }, order_by: { score: desc }) {
            post {
                post_user_id {
                    profile_pic {
                        s3_key
                    }
                    username
                    full_name
                }
                id
            }
            score
        }
    }
`;
export const GET_COMMENTS = gql`
    query getComments($post_id: Int!) {
        comments(where: { post_id: { _eq: $post_id } }, order_by: { created_at: asc }) {
            post_id
            created_at
            commenter {
                username
                profile_pic {
                    s3_key
                }
            }
            comment
        }
    }
`;

export const INSERT_COMMENT = gql`
    mutation insertComment($comment: String!, $post_id: Int!, $user_id: Int!) {
        insert_comments(objects: { comment: $comment, post_id: $post_id, user_id: $user_id }) {
            affected_rows
        }
    }
`;
