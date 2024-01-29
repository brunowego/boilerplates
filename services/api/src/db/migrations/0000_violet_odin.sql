CREATE TABLE IF NOT EXISTS "memberships" (
	"organization_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"role" varchar DEFAULT 'MEMBER' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" varchar,
	"modified_at" timestamp,
	"modified_by" varchar,
	CONSTRAINT "memberships_organization_id_user_id_pk" PRIMARY KEY("organization_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organizations" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"short_name" varchar,
	"slug" varchar NOT NULL,
	"country" varchar,
	"timezone" varchar,
	"default_language" varchar,
	"languages" json,
	"notification_email" varchar,
	"email_domains" json,
	"brand_color" varchar,
	"thumbnail_url" varchar,
	"logo_url" varchar,
	"banner_url" varchar,
	"website_url" varchar,
	"welcome_text" varchar,
	"is_production" boolean DEFAULT false NOT NULL,
	"auth_strategies" json,
	"chat_support" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" varchar,
	"modified_at" timestamp,
	"modified_by" varchar,
	CONSTRAINT "organizations_name_unique" UNIQUE("name"),
	CONSTRAINT "organizations_short_name_unique" UNIQUE("short_name"),
	CONSTRAINT "organizations_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_sessions" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_tokens" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"email" varchar,
	"organization_id" varchar,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"username" varchar NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar,
	"hashed_password" varchar,
	"role" varchar DEFAULT 'USER' NOT NULL,
	"last_sign_in_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"created_by" varchar,
	"modified_at" timestamp,
	"modified_by" varchar,
	CONSTRAINT "auth_users_email_unique" UNIQUE("email"),
	CONSTRAINT "auth_users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "organizations_name_index" ON "organizations" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_email_index" ON "auth_users" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_username_index" ON "auth_users" ("username");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberships" ADD CONSTRAINT "memberships_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberships" ADD CONSTRAINT "memberships_user_id_auth_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberships" ADD CONSTRAINT "memberships_created_by_auth_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "auth_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberships" ADD CONSTRAINT "memberships_modified_by_auth_users_id_fk" FOREIGN KEY ("modified_by") REFERENCES "auth_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_created_by_auth_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "auth_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_modified_by_auth_users_id_fk" FOREIGN KEY ("modified_by") REFERENCES "auth_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_sessions" ADD CONSTRAINT "auth_sessions_user_id_auth_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_tokens" ADD CONSTRAINT "auth_tokens_user_id_auth_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_tokens" ADD CONSTRAINT "auth_tokens_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_users" ADD CONSTRAINT "auth_users_created_by_auth_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "auth_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_users" ADD CONSTRAINT "auth_users_modified_by_auth_users_id_fk" FOREIGN KEY ("modified_by") REFERENCES "auth_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
