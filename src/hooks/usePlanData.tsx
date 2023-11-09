import { useState, useEffect, SetStateAction } from 'react';
import { Plan, PlanData } from '@/types/plan.types';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import app from '@/initializations/firebase';

const usePlanData = (id: string): PlanData => {
  const [plan, setPlan] = useState<Plan>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase(app);
    const planRef = ref(db, `plans/${id}`);

    const handleValueChange = (snapshot: {
      val: () => SetStateAction<Plan | undefined>;
    }) => {
      setPlan(snapshot.val());
      setLoading(false);
    };
    onValue(planRef, handleValueChange);
    return () => off(planRef, 'value', handleValueChange);
  }, [id]);

  return { plan, loading };
};

export default usePlanData;
