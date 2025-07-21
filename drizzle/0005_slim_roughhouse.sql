CREATE TABLE "TemplateDays" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "TemplateDays_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"template_id" integer NOT NULL,
	"day_number" integer NOT NULL,
	"order" integer NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "TemplateItems" ALTER COLUMN "group_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "TemplateGroups" ADD COLUMN "day_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "TemplateItems" ADD COLUMN "day_id" integer NOT NULL;