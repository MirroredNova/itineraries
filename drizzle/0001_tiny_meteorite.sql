CREATE TABLE "TemplateGroups" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "TemplateGroups_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"template_id" integer NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"order" integer NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "TemplateItems" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "TemplateItems_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"template_id" integer NOT NULL,
	"group_id" integer NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"order" integer NOT NULL,
	"notes" text,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL
);
