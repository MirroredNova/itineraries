import { Plan } from '@/types/plan.types';

export const defaultPlan: Plan = {
  uid: '',
  dateCreated: new Date().toISOString(),
  label: '',
  chunks: [],
  configs: [],
  days: [
    {
      dayNum: 'unassigned',
      chunks: [],
    },
  ],
};
