export type PlanConfig = {
  type: string;
  data: string;
};

export type PlanChunk = {
  type: string;
  data: object;
};

export type Plan = {
  dateCreated: string;
  label: string;
  chunks: PlanChunk[];
  configs: PlanConfig[];
};

export const defaultPlan: Plan = {
  dateCreated: new Date().toISOString(),
  label: '',
  chunks: [],
  configs: [],
};
