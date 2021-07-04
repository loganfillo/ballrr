
CREATE TRIGGER "set_public_users_height"
BEFORE UPDATE ON "public"."users"
FOR EACH ROW EXECUTE FUNCTION set_current_timestamp_height();COMMENT ON TRIGGER "set_public_users_height" ON "public"."users"
IS E'trigger to set value of column "height" to current timestamp on row update';

ALTER TABLE "public"."users" DROP COLUMN "height";

ALTER TABLE "public"."users" ADD COLUMN "height" text;
ALTER TABLE "public"."users" ALTER COLUMN "height" DROP NOT NULL;

ALTER TABLE "public"."users" DROP COLUMN "league";

ALTER TABLE "public"."users" DROP COLUMN "foot";

ALTER TABLE "public"."users" DROP COLUMN "weight";

DROP TRIGGER IF EXISTS "set_public_users_height" ON "public"."users";
ALTER TABLE "public"."users" DROP COLUMN "height";

ALTER TABLE "public"."users" DROP COLUMN "location";
