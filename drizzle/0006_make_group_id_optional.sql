-- Make group_id optional in TemplateItems to allow items directly on days
ALTER TABLE "TemplateItems" ALTER COLUMN "group_id" DROP NOT NULL; 