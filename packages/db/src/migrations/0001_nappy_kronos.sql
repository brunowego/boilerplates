CREATE TABLE IF NOT EXISTS "product_images" (
	"product_id" varchar NOT NULL,
	"filename" varchar NOT NULL,
	"url" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "product_images_product_id_filename_pk" PRIMARY KEY("product_id","filename")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
