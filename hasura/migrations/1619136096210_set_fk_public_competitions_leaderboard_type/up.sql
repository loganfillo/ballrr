alter table "public"."competitions"
           add constraint "competitions_leaderboard_type_fkey"
           foreign key ("leaderboard_type")
           references "public"."leaderboard_type"
           ("value") on update restrict on delete restrict;
