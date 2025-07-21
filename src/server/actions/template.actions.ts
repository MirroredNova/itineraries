'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { eq, and, sql, desc, asc } from 'drizzle-orm';
import { db } from '@/server/utils/db/supabase-db';
import {
  templatesTable,
  templateDaysTable,
  templateItemsTable,
} from '@/server/utils/db/schemas/Templates';
import { TemplateItemType } from '@/types/schemas.types';

export const createTemplateAction = async (formData: FormData) => {
  const name = formData.get('name') as string;

  if (!name?.trim()) {
    throw new Error('Template name is required');
  }

  const newTemplate = {
    name: name.trim(),
  };

  const res = await db.insert(templatesTable).values(newTemplate).returning();

  if (!res[0]) {
    throw new Error('Failed to create template');
  }

  revalidatePath('/templates');
  redirect(`/templates/${res[0].id}`);
};

export const getAllTemplatesAction = async () => {
  return await db
    .select()
    .from(templatesTable)
    .orderBy(desc(templatesTable.createdAt));
};

export const getTemplateByIdAction = async (id: number) => {
  const res = await db
    .select()
    .from(templatesTable)
    .where(eq(templatesTable.id, id))
    .limit(1);

  if (!res[0]) {
    throw new Error('Template not found');
  }

  return res[0];
};

export const updateTemplateAction = async (formData: FormData) => {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;

  if (!id || !name?.trim()) {
    throw new Error('Template ID and name are required');
  }

  await db
    .update(templatesTable)
    .set({ name: name.trim() })
    .where(eq(templatesTable.id, parseInt(id)));

  revalidatePath('/templates');
  revalidatePath(`/templates/${id}`);
};

export const deleteTemplateAction = async (templateId: number) => {
  // Delete all items first
  await db
    .delete(templateItemsTable)
    .where(eq(templateItemsTable.templateId, templateId));

  // Delete all days
  await db
    .delete(templateDaysTable)
    .where(eq(templateDaysTable.templateId, templateId));

  // Delete the template
  await db.delete(templatesTable).where(eq(templatesTable.id, templateId));

  revalidatePath('/templates');
};

export const getTemplateDaysGroupsAndItemsAction = async (
  templateId: number,
) => {
  // Get all days for the template
  const days = await db
    .select()
    .from(templateDaysTable)
    .where(eq(templateDaysTable.templateId, templateId))
    .orderBy(asc(templateDaysTable.order));

  // Get all items for the template
  const items = await db
    .select()
    .from(templateItemsTable)
    .where(eq(templateItemsTable.templateId, templateId))
    .orderBy(asc(templateItemsTable.order));

  // Group items by day
  const daysWithItems = days.map((day) => ({
    ...day,
    items: items.filter((item) => item.dayId === day.id),
  }));

  return daysWithItems;
};

export const addTemplateDayAction = async (
  templateId: number,
  position?: { dayId: number; before: boolean },
) => {
  // Validate that the template exists
  const template = await db
    .select()
    .from(templatesTable)
    .where(eq(templatesTable.id, templateId))
    .limit(1);

  if (!template[0]) {
    throw new Error('Template not found');
  }

  // Get current days to determine the new day number and order
  const currentDays = await db
    .select()
    .from(templateDaysTable)
    .where(eq(templateDaysTable.templateId, templateId))
    .orderBy(asc(templateDaysTable.order));

  let newDayNumber: number;
  let newOrder: number;

  if (position) {
    // Insert at specific position
    const targetDay = currentDays.find((day) => day.id === position.dayId);
    if (!targetDay) {
      throw new Error('Target day not found');
    }

    if (position.before) {
      // Insert before the target day
      newDayNumber = targetDay.dayNumber;
      newOrder = targetDay.order;
      // Shift existing days
      await db
        .update(templateDaysTable)
        .set({
          dayNumber: sql`${templateDaysTable.dayNumber} + 1`,
          order: sql`${templateDaysTable.order} + 1`,
        })
        .where(
          and(
            eq(templateDaysTable.templateId, templateId),
            sql`${templateDaysTable.order} >= ${targetDay.order}`,
          ),
        );
    } else {
      // Insert after the target day
      newDayNumber = targetDay.dayNumber + 1;
      newOrder = targetDay.order + 1;
      // Shift existing days
      await db
        .update(templateDaysTable)
        .set({
          dayNumber: sql`${templateDaysTable.dayNumber} + 1`,
          order: sql`${templateDaysTable.order} + 1`,
        })
        .where(
          and(
            eq(templateDaysTable.templateId, templateId),
            sql`${templateDaysTable.order} > ${targetDay.order}`,
          ),
        );
    }
  } else {
    // Add at the end
    const maxDay =
      currentDays.length > 0
        ? Math.max(...currentDays.map((d) => d.dayNumber))
        : 0;
    const maxOrder =
      currentDays.length > 0 ? Math.max(...currentDays.map((d) => d.order)) : 0;
    newDayNumber = maxDay + 1;
    newOrder = maxOrder + 1;
  }

  const newDay = {
    templateId,
    dayNumber: newDayNumber,
    order: newOrder,
  };

  const res = await db.insert(templateDaysTable).values(newDay).returning();
  return res[0];
};

export const renumberTemplateDays = async (templateId: number) => {
  const days = await db
    .select()
    .from(templateDaysTable)
    .where(eq(templateDaysTable.templateId, templateId))
    .orderBy(asc(templateDaysTable.order));

  // Renumber days sequentially
  for (let i = 0; i < days.length; i++) {
    await db
      .update(templateDaysTable)
      .set({
        dayNumber: i + 1,
        order: i + 1,
      })
      .where(eq(templateDaysTable.id, days[i].id));
  }
};

export const deleteTemplateDayAction = async (dayId: number) => {
  // Get the day to find its template
  const day = await db
    .select()
    .from(templateDaysTable)
    .where(eq(templateDaysTable.id, dayId))
    .limit(1);

  if (!day[0]) {
    throw new Error('Day not found');
  }

  const templateId = day[0].templateId;

  // Delete all items in this day
  await db
    .delete(templateItemsTable)
    .where(eq(templateItemsTable.dayId, dayId));

  // Delete the day
  await db.delete(templateDaysTable).where(eq(templateDaysTable.id, dayId));

  // Renumber remaining days
  await renumberTemplateDays(templateId);
};

export const addTemplateItemAction = async (
  templateId: number,
  dayId: number,
  type: TemplateItemType,
  subcategory?: string,
  fieldData?: Record<string, unknown>,
  notes?: string,
  tags?: string[],
  name?: string,
) => {
  // Validate that the day exists
  const day = await db
    .select()
    .from(templateDaysTable)
    .where(eq(templateDaysTable.id, dayId))
    .limit(1);

  if (!day[0]) {
    throw new Error('Day not found');
  }

  // Find max order for this day
  const maxOrderQuery = db
    .select({ max: sql<number>`max(${templateItemsTable.order})` })
    .from(templateItemsTable)
    .where(eq(templateItemsTable.dayId, dayId));

  const maxOrder = await maxOrderQuery;
  const nextOrder = (maxOrder[0]?.max || 0) + 1;

  const newItem = {
    templateId,
    dayId,
    name: name || null,
    type,
    subcategory,
    fieldData,
    notes,
    tags,
    order: nextOrder,
  };

  const res = await db.insert(templateItemsTable).values(newItem).returning();
  return res[0];
};

export const deleteTemplateItemAction = async (itemId: number) => {
  await db.delete(templateItemsTable).where(eq(templateItemsTable.id, itemId));
};

export const updateTemplateItemAction = async (
  itemId: number,
  type: TemplateItemType,
  notes?: string,
  subcategory?: string,
  fieldData?: Record<string, unknown>,
  tags?: string[],
  name?: string,
) => {
  await db
    .update(templateItemsTable)
    .set({
      name: name || null,
      type,
      notes,
      subcategory,
      fieldData,
      tags,
    })
    .where(eq(templateItemsTable.id, itemId));
};
