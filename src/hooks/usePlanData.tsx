import { useState, useEffect, useCallback } from 'react';
import { Plan, PlanData } from '@/types/plan.types';
import { getPlan } from '@/services/realtime.services';

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

  return { planData, setPlanData, loading, refreshData: getPlanData };
};

export default usePlanData;
