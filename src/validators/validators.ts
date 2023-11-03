import { newPlanSchema } from '@/schemas/plan.schema';
import Ajv from 'ajv';

const ajv = new Ajv();

export const validators = {
  validateNewPlan: ajv.compile(newPlanSchema),
};
