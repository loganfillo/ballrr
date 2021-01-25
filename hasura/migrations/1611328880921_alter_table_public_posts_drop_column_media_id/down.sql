ALTER TABLE "public"."posts" ADD COLUMN "media_id" int4;
ALTER TABLE "public"."posts" ALTER COLUMN "media_id" DROP NOT NULL;
ALTER TABLE "public"."posts" ADD CONSTRAINT posts_media_id_fkey FOREIGN KEY (media_id) REFERENCES "public"."post_media" (id) ON DELETE restrict ON UPDATE restrict;
ALTER TABLE "public"."posts" ADD CONSTRAINT media_id_fkey FOREIGN KEY (id) REFERENCES "public"."posts" (media_id) ON DELETE cascade ON UPDATE no action;
ALTER TABLE "public"."posts" ADD CONSTRAINT posts_media_id_key UNIQUE (media_id);
