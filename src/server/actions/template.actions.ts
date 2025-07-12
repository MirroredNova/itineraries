'use server';

import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import { templatesTable } from '@/server/utils/db/schemas/Templates';
import { db } from '@/server/utils/db/supabase-db';

export const createTemplateAction = async (formData: FormData) => {
  const name = formData.get('name') as string;
  const numDays = parseInt(formData.get('numdays') as string, 10);

  const newTemplate: typeof templatesTable.$inferInsert = {
    name,
    numDays,
  };

  const res = await db
    .insert(templatesTable)
    .values(newTemplate)
    .returning({ id: templatesTable.id });
  redirect(`/templates/${res[0].id}`);
};

export const getAllTemplatesAction = async () => {
  return await db.select().from(templatesTable);
};

export const getTemplateByIdAction = async (id: number) => {
  const res = await db
    .select()
    .from(templatesTable)
    .where(eq(templatesTable.id, id))
    .limit(1);
  return res[0];
};

export const updateTemplateAction = async (formData: FormData) => {
  const id = parseInt(formData.get('id') as string, 10);
  const name = formData.get('name') as string;
  const numDays = parseInt(formData.get('numdays') as string, 10);

  const updatedTemplate: typeof templatesTable.$inferInsert = {
    name,
    numDays,
  };

  await db
    .update(templatesTable)
    .set(updatedTemplate)
    .where(eq(templatesTable.id, id));
  redirect(`/templates/${id}`);
};
