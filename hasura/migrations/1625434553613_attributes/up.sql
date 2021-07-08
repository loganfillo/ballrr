
ALTER TABLE "public"."users" ADD COLUMN "location" text NULL;

ALTER TABLE "public"."users" ADD COLUMN "height" text NULL;

CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_height"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."height" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_users_height"
BEFORE UPDATE ON "public"."users"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_height"();
COMMENT ON TRIGGER "set_public_users_height" ON "public"."users" 
IS 'trigger to set value of column "height" to current timestamp on row update';

ALTER TABLE "public"."users" ADD COLUMN "weight" text NULL;

ALTER TABLE "public"."users" ADD COLUMN "foot" text NULL;

ALTER TABLE "public"."users" ADD COLUMN "league" text NULL;

ALTER TABLE "public"."users" DROP COLUMN "height" CASCADE;

ALTER TABLE "public"."users" ADD COLUMN "height" text NULL;

DROP TRIGGER "set_public_users_height" ON "public"."users";
