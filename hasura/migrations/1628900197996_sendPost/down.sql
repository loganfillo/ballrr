
alter table "public"."notifications" drop constraint "notifications_post_id_fkey",
          add constraint "notifications_liked_post_fkey"
          foreign key ("post_id")
          references "public"."posts"
          ("id")
          on update restrict
          on delete cascade;

alter table "public"."notifications" rename column "user_notified_id" to "user_followed_id";

alter table "public"."notifications" rename column "post_id" to "liked_post_id";
