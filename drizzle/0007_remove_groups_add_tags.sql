-- Remove the groups table entirely
DROP TABLE IF EXISTS "TemplateGroups";

-- Add tags column to TemplateItems
ALTER TABLE "TemplateItems" ADD COLUMN "tags" json;

-- Remove the group_id column from TemplateItems
ALTER TABLE "TemplateItems" DROP COLUMN IF EXISTS "group_id"; 