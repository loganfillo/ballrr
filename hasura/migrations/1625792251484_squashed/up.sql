
ALTER TABLE "public"."notifications" ALTER COLUMN "user_id_of_notifier" DROP NOT NULL;

ALTER TABLE "public"."notifications" ADD COLUMN "comment" text NULL;
