alter table "public"."media" drop constraint "media_id_fkey",
          add constraint "media_id_fkey"
          foreign key ("id")
          references "public"."posts"
          ("media_id")
          on update restrict
          on delete cascade;
