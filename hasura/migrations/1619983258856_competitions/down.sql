
alter table "public"."competitions" drop constraint "competitions_post_id_fkey",
          add constraint "competitions_post_id_fkey"
          foreign key ("post_id")
          references "public"."posts"
          ("id")
          on update restrict
          on delete restrict;

alter table "public"."competition_submission" drop constraint "competition_submission_post_id_fkey",
          add constraint "competition_submission_post_id_fkey"
          foreign key ("post_id")
          references "public"."posts"
          ("id")
          on update restrict
          on delete restrict;

ALTER TABLE "public"."competition_submission" DROP COLUMN "score";

DROP TABLE "public"."competition_submission";

alter table "public"."competitions" drop constraint "competitions_pkey";
alter table "public"."competitions"
    add constraint "competitions_pkey" 
    primary key ( "post_id", "id" );

alter table "public"."competitions" drop constraint "competitions_pkey";
alter table "public"."competitions"
    add constraint "competitions_pkey" 
    primary key ( "id" );

alter table "public"."competitions" drop constraint "competitions_leaderboard_type_fkey";

ALTER TABLE "public"."competitions" DROP COLUMN "leaderboard_type";

DROP TABLE "public"."leaderboard_type";

DROP TABLE "public"."competitions";
