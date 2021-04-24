CREATE TABLE "public"."competition_submission"("post_id" integer NOT NULL, "comp_id" integer NOT NULL, "id" serial NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("comp_id") REFERENCES "public"."competitions"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("post_id"));
