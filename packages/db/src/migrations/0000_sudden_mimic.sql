CREATE TABLE IF NOT EXISTS "files" (
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"filename" varchar NOT NULL,
	"url" varchar NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "files_filename_unique" UNIQUE("filename")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "files_filename_idx" ON "files" ("filename");