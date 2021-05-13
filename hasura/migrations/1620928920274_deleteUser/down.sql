
alter table "public"."thumbnail_media" drop constraint "thumbnail_media_post_id_fkey",
          add constraint "thumbnail_media_post_id_fkey"
          foreign key ("post_id")
          references "public"."posts"
          ("id")
          on update restrict
          on delete cascade;

alter table "public"."profile_pic_media" drop constraint "profile_pic_media_user_id_fkey",
          add constraint "profile_pic_media_user_id_fkey"
          foreign key ("user_id")
          references "public"."users"
          ("id")
          on update restrict
          on delete set null;

alter table "public"."competition_submission" drop constraint "competition_submission_post_id_fkey",
          add constraint "competition_submission_post_id_fkey"
          foreign key ("post_id")
          references "public"."posts"
          ("id")
          on update restrict
          on delete cascade;

alter table "public"."competitions" drop constraint "competitions_user_id_fkey",
          add constraint "competitions_user_id_fkey"
          foreign key ("user_id")
          references "public"."users"
          ("id")
          on update restrict
          on delete restrict;
