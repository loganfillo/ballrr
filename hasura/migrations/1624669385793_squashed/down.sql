
ALTER TABLE "public"."post_likes" ADD COLUMN "notification_seen" bool;
ALTER TABLE "public"."post_likes" ALTER COLUMN "notification_seen" DROP NOT NULL;

ALTER TABLE "public"."post_likes" DROP COLUMN "notification_seen";

alter table "public"."notifications" rename column "liked_post_id" to "liked_post";

alter table "public"."notifications" drop constraint "notifications_liked_post_fkey";

ALTER TABLE "public"."notifications" ADD COLUMN "notifier_user_id" int4;
ALTER TABLE "public"."notifications" ALTER COLUMN "notifier_user_id" DROP NOT NULL;

alter table "public"."notifications" drop constraint "notifications_user_id_of_notifier_fkey",
          add constraint "notifications_notifier_user_id_fkey"
          foreign key ("notifier_user_id")
          references "public"."users"
          ("id")
          on update no action
          on delete no action;

alter table "public"."notifications" rename column "user_followed_id" to "user_followed_if";

alter table "public"."notifications" rename column "user_followed_if" to "user_id_of_notified";

alter table "public"."notifications" rename column "user_id_of_notified" to "user_followed_id";

ALTER TABLE "public"."notifications" DROP COLUMN "user_id_of_notifier";

alter table "public"."notifications" rename column "liked_post" to "post_id";

alter table "public"."notifications" drop constraint "notifications_id_key";

alter table "public"."notifications" drop constraint "notifications_notifier_user_id_fkey",
          add constraint "notifications_notifier_user_id_fkey"
          foreign key ("notifier_user_id")
          references "public"."users"
          ("id")
          on update no action
          on delete no action;

alter table "public"."notifications" drop constraint "notifications_notifier_user_id_fkey",
          add constraint "notifications_user_id_fkey"
          foreign key ("notifier_user_id")
          references "public"."users"
          ("id")
          on update restrict
          on delete restrict;

ALTER TABLE "public"."notifications" ALTER COLUMN "post_id" SET NOT NULL;

ALTER TABLE "public"."notifications" DROP COLUMN "user_followed_id";

ALTER TABLE "public"."notifications" DROP COLUMN "post_id";

ALTER TABLE "public"."notifications" ADD COLUMN "user_followed_id" int4;
ALTER TABLE "public"."notifications" ALTER COLUMN "user_followed_id" DROP NOT NULL;

ALTER TABLE "public"."notifications" ADD COLUMN "post_id" int4;
ALTER TABLE "public"."notifications" ALTER COLUMN "post_id" DROP NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "post_id" DROP NOT NULL;

ALTER TABLE "public"."notifications" DROP COLUMN "user_followed_id";

ALTER TABLE "public"."notifications" DROP COLUMN "post_id";

ALTER TABLE "public"."notifications" ADD COLUMN "link_to_content_id" int4;
ALTER TABLE "public"."notifications" ALTER COLUMN "link_to_content_id" DROP NOT NULL;

ALTER TABLE "public"."notifications" ADD COLUMN "notified_user_id" int4;
ALTER TABLE "public"."notifications" ALTER COLUMN "notified_user_id" DROP NOT NULL;

ALTER TABLE "public"."notifications" DROP COLUMN "notified_user_id";

alter table "public"."notifications" rename column "notifier_user_id" to "user_id";

ALTER TABLE "public"."notifications" ADD COLUMN "notifier_username" text;
ALTER TABLE "public"."notifications" ALTER COLUMN "notifier_username" DROP NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "notification_seen" DROP NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "notification_type" DROP NOT NULL;

ALTER TABLE "public"."notifications" DROP COLUMN "created_at";

ALTER TABLE "public"."notifications" ADD COLUMN "created_at" timetz;
ALTER TABLE "public"."notifications" ALTER COLUMN "created_at" DROP NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "notifier_username" DROP NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "link_to_content_id" DROP NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "user_id" DROP NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "created_at" SET NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "user_id" SET NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "link_to_content_id" SET NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "notifier_username" SET NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "notifier_username" SET NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "notifier_username" DROP NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "user_id" DROP NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "notification_type" SET NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "user_id" SET NOT NULL;

ALTER TABLE "public"."notifications" ALTER COLUMN "notifier_username" SET NOT NULL;

ALTER TABLE "public"."notifications" DROP COLUMN "notification_seen";

ALTER TABLE "public"."notifications" ADD COLUMN "notification_seen" text;
ALTER TABLE "public"."notifications" ALTER COLUMN "notification_seen" DROP NOT NULL;

ALTER TABLE "public"."post_likes" ADD COLUMN "notification_seen" bool;
ALTER TABLE "public"."post_likes" ALTER COLUMN "notification_seen" DROP NOT NULL;
ALTER TABLE "public"."post_likes" ALTER COLUMN "notification_seen" SET DEFAULT false;

alter table "public"."notifications" drop constraint "notifications_user_id_fkey";

DROP TABLE "public"."notifications";

ALTER TABLE "public"."notifications" DROP COLUMN "user_id";

DROP TABLE "public"."notifications";
