export type PlanConfig = {
  type: string;
  data: string;
};

export type Plan = {
  dateCreated: string;
  label: string;
  chunks: [];
  configs: PlanConfig[];
};

export const defaultPlan: Plan = {
  dateCreated: new Date().toISOString(),
  label: '',
  chunks: [],
  configs: [],
};
