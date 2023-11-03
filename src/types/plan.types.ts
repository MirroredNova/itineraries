export type PlanConfig = {
  type: string;
  data: string;
};

export type PlanChunk = {
  type: string;
  data: object;
};

export type PlanDay = {
  dayNum: string;
  chunks: PlanChunk[];
};

export type Plan = {
  dateCreated: string;
  label: string;
  days: PlanDay[];
  chunks: PlanChunk[];
  configs: PlanConfig[];
};

export type PlanData = {
  planData: Plan | undefined;
  loading: boolean;
  id: string;
  refreshData: () => Promise<void>;
};
