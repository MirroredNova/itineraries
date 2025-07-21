import { integer, pgTable, text, timestamp, json } from 'drizzle-orm/pg-core';

export const templatesTable = pgTable('Templates', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp('created_at', {
    precision: 6,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  name: text('name'),
});

// Days are the primary organizing structure
export const templateDaysTable = pgTable('TemplateDays', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  templateId: integer('template_id').notNull(),
  dayNumber: integer('day_number').notNull(), // Auto-numbered: 1, 2, 3, etc.
  order: integer('order').notNull(),
  createdAt: timestamp('created_at', {
    precision: 6,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

// Items belong directly to days with tags for organization
export const templateItemsTable = pgTable('TemplateItems', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  templateId: integer('template_id').notNull(),
  dayId: integer('day_id').notNull(), // References TemplateDays
  name: text('name'), // Optional - for custom item names
  type: text('type').notNull(), // 'hotel', 'restaurant', 'activity', 'transport', 'custom'
  subcategory: text('subcategory'), // 'checkin', 'checkout', 'car_rental', 'public_transit', etc.
  time: text('time'), // '4:00 PM', 'After 4:00 PM', 'Flexible', etc.
  tags: json('tags'), // JSON array of strings for flexible grouping
  order: integer('order').notNull(),
  notes: text('notes'),
  fieldData: json('field_data'), // JSON object to store structured form field values
  createdAt: timestamp('created_at', {
    precision: 6,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});
