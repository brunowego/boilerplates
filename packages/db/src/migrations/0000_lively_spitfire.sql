CREATE TABLE IF NOT EXISTS "waitlist" (
	"id" varchar PRIMARY KEY NOT NULL,
	"first_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "waitlist_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "waitlist" ("email");