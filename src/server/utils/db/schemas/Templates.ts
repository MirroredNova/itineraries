import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const templatesTable = pgTable('Templates', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp('created_at', {
    precision: 6,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  name: text('name'),
  numDays: integer('num_days').default(1),
});
