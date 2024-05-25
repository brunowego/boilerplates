CREATE TABLE IF NOT EXISTS "pages" (
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"handle" varchar NOT NULL,
	"draft" json,
	"data" json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "pages_handle_unique" UNIQUE("handle")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pages_handle_idx" ON "pages" ("handle");