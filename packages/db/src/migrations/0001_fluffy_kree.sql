ALTER TABLE "workspaces" ADD COLUMN "namespace" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_namespace_unique" UNIQUE("namespace");