'use client';

import React, { ReactNode, createContext } from 'react';
import usePlanData from '@/hooks/usePlanData';
import { PlanData } from '@/types/plan.types';

type Props = {
  id: string;
  children: ReactNode;
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
