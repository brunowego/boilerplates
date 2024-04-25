ALTER TABLE "users" ADD COLUMN "linkedin_id" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_linkedin_id_unique" UNIQUE("linkedin_id");