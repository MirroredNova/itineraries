import { newPlanSchema, updatePlanSchema } from '@/schemas/plan.schema';
import Ajv from 'ajv';

const ajv = new Ajv();

export const validators = {
  validateNewPlan: ajv.compile(newPlanSchema),
  validateUpdatePlan: ajv.compile(updatePlanSchema),
};
