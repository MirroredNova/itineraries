'use client';

import { Plan } from '@/constants/plan';
import usePlanData from '@/hooks/usePlanData';
import React, { createContext } from 'react';

type PlanData = {
  planData: Plan | undefined;
  loading: boolean;
  id: string;
  refreshData: () => Promise<void>;
};

type Props = {
  id: string;
  children: React.ReactNode;
};

const PlanDataContext = createContext<PlanData>({
  refreshData: async () => {},
  planData: undefined,
  loading: false,
  id: '',
});

const PlanDataProvider = ({ id, children }: Props) => {
  const planData = usePlanData(id);
  return (
    <PlanDataContext.Provider value={{ ...planData, id }}>
      {children}
    </PlanDataContext.Provider>
  );
};

export { PlanDataContext, PlanDataProvider };
