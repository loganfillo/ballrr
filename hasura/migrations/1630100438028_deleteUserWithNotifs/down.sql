alter table "public"."notifications" drop constraint "notifications_user_id_of_notifier_fkey",
  add constraint "notifications_user_id_of_notifier_fkey"
  foreign key ("user_id_of_notifier")
  references "public"."users"
  ("id") on update no action on delete no action;
