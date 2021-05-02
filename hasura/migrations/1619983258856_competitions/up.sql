
CREATE TABLE "public"."competitions"("name" text NOT NULL, "description" text NOT NULL, "time_limit" integer, "creator_score" integer, "id" serial NOT NULL, "user_id" integer NOT NULL, "post_id" integer NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("post_id"));

CREATE TABLE "public"."leaderboard_type"("value" text NOT NULL, "description" text NOT NULL, PRIMARY KEY ("value") );

ALTER TABLE "public"."competitions" ADD COLUMN "leaderboard_type" text NOT NULL DEFAULT 'likes';

alter table "public"."competitions"
           add constraint "competitions_leaderboard_type_fkey"
           foreign key ("leaderboard_type")
           references "public"."leaderboard_type"
           ("value") on update restrict on delete restrict;

alter table "public"."competitions" drop constraint "competitions_pkey";
alter table "public"."competitions"
    add constraint "competitions_pkey" 
    primary key ( "id", "post_id" );

alter table "public"."competitions" drop constraint "competitions_pkey";
alter table "public"."competitions"
    add constraint "competitions_pkey" 
    primary key ( "id" );

CREATE TABLE "public"."competition_submission"("post_id" integer NOT NULL, "comp_id" integer NOT NULL, "id" serial NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("comp_id") REFERENCES "public"."competitions"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("post_id"));

ALTER TABLE "public"."competition_submission" ADD COLUMN "score" integer NOT NULL DEFAULT 0;

alter table "public"."competition_submission" drop constraint "competition_submission_post_id_fkey",
             add constraint "competition_submission_post_id_fkey"
             foreign key ("post_id")
             references "public"."posts"
             ("id") on update restrict on delete cascade;

alter table "public"."competitions" drop constraint "competitions_post_id_fkey",
             add constraint "competitions_post_id_fkey"
             foreign key ("post_id")
             references "public"."posts"
             ("id") on update restrict on delete cascade;
