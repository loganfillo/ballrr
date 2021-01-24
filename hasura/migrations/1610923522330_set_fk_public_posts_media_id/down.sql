alter table "public"."posts" drop constraint "posts_media_id_fkey",
          add constraint "posts_media_id_fkey"
          foreign key ("media_id")
          references "public"."media"
          ("id")
          on update restrict
          on delete cascade;
