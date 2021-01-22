alter table "public"."posts" add foreign key ("media_id") references "public"."media"("id") on update restrict on delete cascade;
