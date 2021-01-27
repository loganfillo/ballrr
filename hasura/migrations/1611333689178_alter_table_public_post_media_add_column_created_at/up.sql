ALTER TABLE "public"."post_media" ADD COLUMN "created_at" timestamptz NULL DEFAULT now();
