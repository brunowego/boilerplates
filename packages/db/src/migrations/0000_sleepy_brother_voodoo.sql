CREATE TABLE IF NOT EXISTS "domains" (
	"id" varchar PRIMARY KEY NOT NULL,
	"domain" varchar NOT NULL,
	"verified" boolean DEFAULT false,
	"primary" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "domains_domain_unique" UNIQUE("domain")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "domains_domain_idx" ON "domains" USING btree (domain);