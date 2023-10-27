import { PlanChunk, Plan } from '@/constants/plan';
import { updatePlan } from '@/services/realtime.services';
import { useCallback, useContext } from 'react';
import { PlanDataContext } from '@/components/providers/PlanDataProvider';

type UseChunkFormType = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, data: object) => void;
};

const useChunkForm = (FORM_KEY: string): UseChunkFormType => {
  const { planData, id, refreshData } = useContext(PlanDataContext);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>, data: object) => {
      e.preventDefault();
      if (!planData) return;
      const newChunk: PlanChunk = {
        type: FORM_KEY,
        data,
      };
      const updatedPlanData: Plan = {
        ...planData,
      };
      updatedPlanData.chunks = updatedPlanData.chunks || [];
      updatedPlanData.chunks.push(newChunk);
      await updatePlan(id, updatedPlanData);
      await refreshData();
    },
    [FORM_KEY, id, planData, refreshData],
  );

  return { handleSubmit };
};

export default useChunkForm;
