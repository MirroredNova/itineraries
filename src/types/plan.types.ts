import { Dispatch, SetStateAction } from 'react';

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
  uid: string;
  dateCreated: string;
  label: string;
  days: PlanDay[];
  chunks: PlanChunk[];
  configs: PlanConfig[];
};

export type PlanData = {
  planData: Plan | undefined;
  setPlanData: Dispatch<SetStateAction<Plan | undefined>>;
  loading: boolean;
  refreshData: () => Promise<void>;
};

export type PlanDataContextType = PlanData & {
  id: string;
};
