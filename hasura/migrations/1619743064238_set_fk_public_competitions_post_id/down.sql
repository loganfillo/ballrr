alter table "public"."competitions" drop constraint "competitions_post_id_fkey",
          add constraint "competitions_post_id_fkey"
          foreign key ("post_id")
          references "public"."posts"
          ("id")
          on update restrict
          on delete restrict;
