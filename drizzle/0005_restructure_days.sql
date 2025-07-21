-- Create new TemplateDays table
CREATE TABLE "TemplateDays" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "TemplateDays_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"template_id" integer NOT NULL,
	"day_number" integer NOT NULL,
	"order" integer NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL
);

-- Add day_id column to TemplateGroups
ALTER TABLE "TemplateGroups" ADD COLUMN "day_id" integer;

-- Add day_id column to TemplateItems  
ALTER TABLE "TemplateItems" ADD COLUMN "day_id" integer;

-- Remove 'day' from the type options in TemplateGroups (will be handled by application logic)
-- Note: We'll need to update existing data to migrate day groups to the new structure 