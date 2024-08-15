CREATE TABLE IF NOT EXISTS "user_addresses" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"zip_code" varchar NOT NULL,
	"state" varchar NOT NULL,
	"city" varchar NOT NULL,
	"neighborhood" varchar NOT NULL,
	"street" varchar NOT NULL,
	"number" varchar NOT NULL,
	"reference" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
