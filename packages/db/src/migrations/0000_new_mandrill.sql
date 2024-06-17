DO $$ BEGIN
 CREATE TYPE "public"."payment_method_identifier_type" AS ENUM('phone_number', 'email', 'ssn', 'ein', 'random_key', 'id', 'url', 'bank_account');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."payment_method_type" AS ENUM('manual_pix', 'paypal', 'revolut', 'wise', 'mercado_pago', 'bank_transfer', 'cod', 'store_credit');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment_methods" (
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "payment_method_type" NOT NULL,
	"identifier" varchar,
	"identifier_type" "payment_method_identifier_type",
	"params" jsonb,
	"enabled" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "payment_methods_type_unique" UNIQUE("type")
);
