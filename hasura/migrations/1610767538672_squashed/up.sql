
CREATE TABLE "public"."users"("id" text NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));

CREATE TABLE "public"."files"("name" text NOT NULL, "url" text NOT NULL, "id" serial NOT NULL, PRIMARY KEY ("id") );

ALTER TABLE "public"."files" ALTER COLUMN "name" DROP NOT NULL;

alter table "public"."files" rename column "url" to "s3_url";

ALTER TABLE "public"."files" DROP COLUMN "name" CASCADE;

alter table "public"."files" rename to "media";

ALTER TABLE "public"."users" ALTER COLUMN "id" DROP DEFAULT;

ALTER TABLE "public"."users" ADD COLUMN "id_int" serial NOT NULL UNIQUE;

alter table "public"."users" rename column "id" to "id_string";

alter table "public"."users" rename column "id_int" to "id";

alter table "public"."users" drop constraint "users_pkey";
alter table "public"."users"
    add constraint "users_pkey" 
    primary key ( "id" );

ALTER TABLE "public"."users" DROP COLUMN "id_string" CASCADE;

alter table "public"."users" rename column "name" to "username";

ALTER TABLE "public"."users" ADD COLUMN "full_name" text NULL;

ALTER TABLE "public"."users" ADD COLUMN "bio" text NULL;

ALTER TABLE "public"."users" ADD COLUMN "media_id" integer NULL;

ALTER TABLE "public"."users" ADD COLUMN "position" text NULL;

ALTER TABLE "public"."users" ADD COLUMN "created_at" timestamptz NULL DEFAULT now();

CREATE TABLE "public"."followers"("user_id" integer NOT NULL, "follower_id" integer NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("user_id") );

CREATE TABLE "public"."posts"("id" serial NOT NULL, "user_id" integer NOT NULL, "media_id" integer NOT NULL, "caption" text, "like_count" integer NOT NULL DEFAULT 0, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("id"));

alter table "public"."posts"
           add constraint "posts_media_id_fkey"
           foreign key ("media_id")
           references "public"."media"
           ("id") on update restrict on delete set null;

alter table "public"."users"
           add constraint "users_media_id_fkey"
           foreign key ("media_id")
           references "public"."media"
           ("id") on update restrict on delete set default;

alter table "public"."posts"
           add constraint "posts_user_id_fkey"
           foreign key ("user_id")
           references "public"."users"
           ("id") on update restrict on delete cascade;

alter table "public"."followers"
           add constraint "followers_user_id_fkey"
           foreign key ("user_id")
           references "public"."users"
           ("id") on update restrict on delete cascade;

alter table "public"."followers"
           add constraint "followers_follower_id_fkey"
           foreign key ("follower_id")
           references "public"."users"
           ("id") on update restrict on delete cascade;

CREATE TABLE "public"."comments"("id" serial NOT NULL, "user_id" integer NOT NULL, "post_id" integer NOT NULL, "comment" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("id"));

alter table "public"."comments"
           add constraint "comments_user_id_fkey"
           foreign key ("user_id")
           references "public"."users"
           ("id") on update restrict on delete cascade;

alter table "public"."comments"
           add constraint "comments_post_id_fkey"
           foreign key ("post_id")
           references "public"."posts"
           ("id") on update restrict on delete cascade;

CREATE TABLE "public"."post_likes"("liked_post_id" integer NOT NULL, "user_id" integer NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("liked_post_id") );

alter table "public"."post_likes"
           add constraint "post_likes_liked_post_id_fkey"
           foreign key ("liked_post_id")
           references "public"."posts"
           ("id") on update restrict on delete cascade;

alter table "public"."post_likes"
           add constraint "post_likes_user_id_fkey"
           foreign key ("user_id")
           references "public"."users"
           ("id") on update restrict on delete cascade;

CREATE TABLE "public"."comment_likes"("comment_id" integer NOT NULL, "user_id" integer NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("comment_id") );

ALTER TABLE "public"."post_likes" ADD COLUMN "id" serial NOT NULL UNIQUE;

alter table "public"."post_likes" drop constraint "post_likes_pkey";
alter table "public"."post_likes"
    add constraint "post_likes_pkey" 
    primary key ( "id" );

ALTER TABLE "public"."followers" ADD COLUMN "id" serial NOT NULL UNIQUE;

alter table "public"."followers" drop constraint "followers_pkey";
alter table "public"."followers"
    add constraint "followers_pkey" 
    primary key ( "id" );

ALTER TABLE "public"."comment_likes" ADD COLUMN "id" serial NOT NULL UNIQUE;

alter table "public"."comment_likes" drop constraint "comment_likes_pkey";
alter table "public"."comment_likes"
    add constraint "comment_likes_pkey" 
    primary key ( "id" );

alter table "public"."comment_likes"
           add constraint "comment_likes_comment_id_fkey"
           foreign key ("comment_id")
           references "public"."comments"
           ("id") on update restrict on delete cascade;

alter table "public"."comment_likes"
           add constraint "comment_likes_user_id_fkey"
           foreign key ("user_id")
           references "public"."users"
           ("id") on update restrict on delete cascade;

ALTER TABLE "public"."users" ADD COLUMN "user_id" text NOT NULL UNIQUE DEFAULT 'hello';

ALTER TABLE "public"."users" ALTER COLUMN "username" DROP NOT NULL;
ALTER TABLE "public"."users" ADD CONSTRAINT "users_username_key" UNIQUE ("username");

CREATE TABLE "public"."media_type"("value" text NOT NULL, "description" text NOT NULL, PRIMARY KEY ("value") );

ALTER TABLE "public"."media" ADD COLUMN "type" text NOT NULL DEFAULT 'image';

alter table "public"."media"
           add constraint "media_type_fkey"
           foreign key ("type")
           references "public"."media_type"
           ("value") on update restrict on delete restrict;

alter table "public"."media" rename column "s3_url" to "s3_key";
