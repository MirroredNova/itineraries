import { templatesTable } from '@/server/utils/db/schemas/Templates';

export type TemplateTableType = typeof templatesTable.$inferSelect;
