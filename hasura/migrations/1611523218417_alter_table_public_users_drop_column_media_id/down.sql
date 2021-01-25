ALTER TABLE "public"."users" ADD COLUMN "media_id" int4;
ALTER TABLE "public"."users" ALTER COLUMN "media_id" DROP NOT NULL;
ALTER TABLE "public"."users" ADD CONSTRAINT users_media_id_fkey FOREIGN KEY (media_id) REFERENCES "public"."post_media" (id) ON DELETE set default ON UPDATE restrict;
