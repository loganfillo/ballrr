
ALTER TABLE "public"."notifications" DROP COLUMN "comment";

ALTER TABLE "public"."notifications" ALTER COLUMN "user_id_of_notifier" SET NOT NULL;
