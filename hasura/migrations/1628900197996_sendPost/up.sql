
alter table "public"."notifications" rename column "liked_post_id" to "post_id";

alter table "public"."notifications" rename column "user_followed_id" to "user_notified_id";

alter table "public"."notifications" drop constraint "notifications_liked_post_fkey",
             add constraint "notifications_post_id_fkey"
             foreign key ("post_id")
             references "public"."posts"
             ("id") on update restrict on delete cascade;
