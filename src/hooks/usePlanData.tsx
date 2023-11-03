import { useState, useEffect, useCallback } from 'react';
import { Plan } from '@/types/plan.types';

type PlanData = {
  planData: Plan | undefined;
  loading: boolean;
  refreshData: () => Promise<void>;
};

const usePlanData = (id: string): PlanData => {
  const [planData, setPlanData] = useState<Plan>();
  const [loading, setLoading] = useState(true);

  const getPlanData = useCallback(async () => {
    const res = await fetch(`/api/plan/getPlan?planCode=${id}`);
    const plan = (await res.json()) as Plan;
    if (plan) {
      setPlanData(plan);
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
