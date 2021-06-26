
CREATE TABLE "public"."notifications"("id" serial NOT NULL, "username" text NOT NULL, "content_id" integer NOT NULL, "notification_type" text NOT NULL, "notification_seen" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));

ALTER TABLE "public"."notifications" ADD COLUMN "user_id" integer NULL;

CREATE TABLE "public"."notifications"("link_to_content_id" integer NOT NULL, "user_id" integer NOT NULL, "notifier_username" text NOT NULL, "created_at" timetz NOT NULL, "id" serial NOT NULL, "notification_type" text NOT NULL, "notification_seen" text NOT NULL, PRIMARY KEY ("id") );

alter table "public"."notifications"
           add constraint "notifications_user_id_fkey"
           foreign key ("user_id")
           references "public"."users"
           ("id") on update restrict on delete restrict;

ALTER TABLE "public"."post_likes" DROP COLUMN "notification_seen" CASCADE;

ALTER TABLE "public"."notifications" DROP COLUMN "notification_seen" CASCADE;

ALTER TABLE "public"."notifications" ADD COLUMN "notification_seen" boolean NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "notifier_username" DROP NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "user_id" DROP NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "notification_type" DROP NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "user_id" SET NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "notifier_username" SET NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "notifier_username" DROP NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "notifier_username" DROP NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "link_to_content_id" DROP NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "user_id" DROP NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "created_at" DROP NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "user_id" SET NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "link_to_content_id" SET NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "notifier_username" SET NOT NULL;

ALTER TABLE "public"."notifications" DROP COLUMN "created_at" CASCADE;

ALTER TABLE "public"."notifications" ADD COLUMN "created_at" timestamptz NULL DEFAULT now();

ALTER TABLE "public"."notifications" ALTER COLUMN "notification_type" SET NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "notification_seen" SET NOT NULL;

ALTER TABLE "public"."notifications" DROP COLUMN "notifier_username" CASCADE;

alter table "public"."notifications" rename column "user_id" to "notifier_user_id";

ALTER TABLE "public"."notifications" ADD COLUMN "notified_user_id" integer NOT NULL;

ALTER TABLE "public"."notifications" DROP COLUMN "notified_user_id" CASCADE;

ALTER TABLE "public"."notifications" DROP COLUMN "link_to_content_id" CASCADE;

ALTER TABLE "public"."notifications" ADD COLUMN "post_id" integer NULL;

ALTER TABLE "public"."notifications" ADD COLUMN "user_followed_id" integer NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "post_id" SET NOT NULL;

ALTER TABLE "public"."notifications" DROP COLUMN "post_id" CASCADE;

ALTER TABLE "public"."notifications" DROP COLUMN "user_followed_id" CASCADE;

ALTER TABLE "public"."notifications" ADD COLUMN "post_id" integer NOT NULL;

ALTER TABLE "public"."notifications" ADD COLUMN "user_followed_id" integer NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "post_id" DROP NOT NULL;

alter table "public"."notifications" drop constraint "notifications_user_id_fkey",
             add constraint "notifications_notifier_user_id_fkey"
             foreign key ("notifier_user_id")
             references "public"."users"
             ("id") on update no action on delete no action;

alter table "public"."notifications" drop constraint "notifications_notifier_user_id_fkey",
             add constraint "notifications_notifier_user_id_fkey"
             foreign key ("notifier_user_id")
             references "public"."users"
             ("id") on update no action on delete no action;

alter table "public"."notifications" add constraint "notifications_id_key" unique ("id");

alter table "public"."notifications" rename column "post_id" to "liked_post";

ALTER TABLE "public"."notifications" ADD COLUMN "user_id_of_notifier" integer NOT NULL;

alter table "public"."notifications" rename column "user_followed_id" to "user_id_of_notified";

alter table "public"."notifications" rename column "user_id_of_notified" to "user_followed_if";

alter table "public"."notifications" rename column "user_followed_if" to "user_followed_id";

alter table "public"."notifications" drop constraint "notifications_notifier_user_id_fkey",
             add constraint "notifications_user_id_of_notifier_fkey"
             foreign key ("user_id_of_notifier")
             references "public"."users"
             ("id") on update no action on delete no action;

ALTER TABLE "public"."notifications" DROP COLUMN "notifier_user_id" CASCADE;

alter table "public"."notifications"
           add constraint "notifications_liked_post_fkey"
           foreign key ("liked_post")
           references "public"."posts"
           ("id") on update restrict on delete cascade;

alter table "public"."notifications" rename column "liked_post" to "liked_post_id";

ALTER TABLE "public"."post_likes" ADD COLUMN "notification_seen" boolean NULL;

ALTER TABLE "public"."post_likes" DROP COLUMN "notification_seen" CASCADE;
