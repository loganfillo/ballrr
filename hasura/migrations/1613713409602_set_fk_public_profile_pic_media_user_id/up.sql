alter table "public"."profile_pic_media" drop constraint "profile_pic_media_user_id_fkey",
             add constraint "profile_pic_media_user_id_fkey"
             foreign key ("user_id")
             references "public"."users"
             ("id") on update restrict on delete set null;
