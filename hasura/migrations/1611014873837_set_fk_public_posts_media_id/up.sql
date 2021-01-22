alter table "public"."posts"
           add constraint "posts_media_id_fkey"
           foreign key ("media_id")
           references "public"."media"
           ("id") on update restrict on delete restrict;
