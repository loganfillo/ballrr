alter table "public"."competition_submission" drop constraint "competition_submission_post_id_fkey",
          add constraint "competition_submission_post_id_fkey"
          foreign key ("post_id")
          references "public"."posts"
          ("id")
          on update restrict
          on delete restrict;
