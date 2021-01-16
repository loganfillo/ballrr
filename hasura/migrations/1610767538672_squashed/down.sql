
alter table "public"."media" rename column "s3_key" to "s3_url";

alter table "public"."media" drop constraint "media_type_fkey";

ALTER TABLE "public"."media" DROP COLUMN "type";

DROP TABLE "public"."media_type";

ALTER TABLE "public"."users" ALTER COLUMN "username" SET NOT NULL;
ALTER TABLE "public"."users" DROP CONSTRAINT "users_username_key";

ALTER TABLE "public"."users" DROP COLUMN "user_id";



alter table "public"."comment_likes" drop constraint "comment_likes_user_id_fkey";

alter table "public"."comment_likes" drop constraint "comment_likes_comment_id_fkey";

alter table "public"."comment_likes" drop constraint "comment_likes_pkey";
alter table "public"."comment_likes"
    add constraint "comment_likes_pkey" 
    primary key ( "comment_id" );

ALTER TABLE "public"."comment_likes" DROP COLUMN "id";

alter table "public"."followers" drop constraint "followers_pkey";
alter table "public"."followers"
    add constraint "followers_pkey" 
    primary key ( "user_id" );

ALTER TABLE "public"."followers" DROP COLUMN "id";

alter table "public"."post_likes" drop constraint "post_likes_pkey";
alter table "public"."post_likes"
    add constraint "post_likes_pkey" 
    primary key ( "liked_post_id" );

ALTER TABLE "public"."post_likes" DROP COLUMN "id";

DROP TABLE "public"."comment_likes";

alter table "public"."post_likes" drop constraint "post_likes_user_id_fkey";

alter table "public"."post_likes" drop constraint "post_likes_liked_post_id_fkey";

DROP TABLE "public"."post_likes";

alter table "public"."comments" drop constraint "comments_post_id_fkey";

alter table "public"."comments" drop constraint "comments_user_id_fkey";

DROP TABLE "public"."comments";

alter table "public"."followers" drop constraint "followers_follower_id_fkey";

alter table "public"."followers" drop constraint "followers_user_id_fkey";

alter table "public"."posts" drop constraint "posts_user_id_fkey";

alter table "public"."users" drop constraint "users_media_id_fkey";

alter table "public"."posts" drop constraint "posts_media_id_fkey";

DROP TABLE "public"."posts";

DROP TABLE "public"."followers";

ALTER TABLE "public"."users" DROP COLUMN "created_at";

ALTER TABLE "public"."users" DROP COLUMN "position";

ALTER TABLE "public"."users" DROP COLUMN "media_id";

ALTER TABLE "public"."users" DROP COLUMN "bio";

ALTER TABLE "public"."users" DROP COLUMN "full_name";

alter table "public"."users" rename column "username" to "name";

ALTER TABLE "public"."users" ADD COLUMN "id_string" text;
ALTER TABLE "public"."users" ALTER COLUMN "id_string" DROP NOT NULL;

alter table "public"."users" drop constraint "users_pkey";
alter table "public"."users"
    add constraint "users_pkey" 
    primary key ( "id_string" );

alter table "public"."users" rename column "id" to "id_int";

alter table "public"."users" rename column "id_string" to "id";

ALTER TABLE "public"."users" DROP COLUMN "id_int";

ALTER TABLE ONLY "public"."users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

alter table "public"."media" rename to "files";

ALTER TABLE "public"."files" ADD COLUMN "name" text;
ALTER TABLE "public"."files" ALTER COLUMN "name" DROP NOT NULL;

alter table "public"."files" rename column "s3_url" to "url";

ALTER TABLE "public"."files" ALTER COLUMN "name" SET NOT NULL;

DROP TABLE "public"."files";

DROP TABLE "public"."users";

ALTER TABLE "public"."files" ALTER COLUMN "name" SET NOT NULL;

DROP TABLE "public"."files";

DROP TABLE "public"."users";
