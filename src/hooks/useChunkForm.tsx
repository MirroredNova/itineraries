import { FormEvent, useCallback, useContext } from 'react';
import { PlanDataContext } from '@/components/providers/PlanDataProvider';
import { Plan, PlanChunk } from '@/types/plan.types';
import { updatePlan } from '@/services/realtime.services';

type UseChunkFormType = {
  handleSubmit: (e: FormEvent<HTMLFormElement>, data: object) => void;
};

const useChunkForm = (FORM_KEY: string): UseChunkFormType => {
  const { planData, id, refreshData } = useContext(PlanDataContext);
  // instead of passing refreshData, handle update and refresh in the same API call, get the new plan databack and set it to the context.s

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>, data: object) => {
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
