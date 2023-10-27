import { Plan } from '@/constants/plan';
import { getPlan } from '@/services/realtime.services';
import { useState, useEffect, useCallback } from 'react';

type PlanData = {
  planData: Plan | undefined;
  loading: boolean;
  refreshData: () => Promise<void>;
};

const usePlanData = (id: string): PlanData => {
  const [planData, setPlanData] = useState<Plan>();
  const [loading, setLoading] = useState(true);

  const getPlanData = useCallback(async () => {
    const planDataRes = await getPlan(id);
    if (planDataRes) {
      setPlanData(planDataRes);
    }
  }, [id]);

  const getPlanDataAsync = useCallback(async () => {
    setLoading(true);
    await getPlanData();
    setLoading(false);
  }, [getPlanData]);

  useEffect(() => {
    getPlanDataAsync();
  }, [getPlanDataAsync]);

  return { planData, loading, refreshData: getPlanData };
};

export default usePlanData;
