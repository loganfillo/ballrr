alter table "public"."post_media"
           add constraint "post_media_post_id_fkey"
           foreign key ("post_id")
           references "public"."posts"
           ("id") on update restrict on delete cascade;
