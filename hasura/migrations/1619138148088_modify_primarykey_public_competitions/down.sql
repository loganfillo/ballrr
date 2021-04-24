alter table "public"."competitions" drop constraint "competitions_pkey";
alter table "public"."competitions"
    add constraint "competitions_pkey" 
    primary key ( "post_id", "id" );
