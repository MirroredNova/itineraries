import { FormEvent, useCallback, useContext } from 'react';
import { PlanDataContext } from '@/components/providers/PlanDataProvider';
import { Plan, PlanChunk } from '@/types/plan.types';
import { updatePlan } from '@/services/realtime.services';

type UseChunkFormType = {
  handleSubmit: (e: FormEvent<HTMLFormElement>, data: object) => void;
};

const useChunkForm = (FORM_KEY: string): UseChunkFormType => {
  const { plan, id } = useContext(PlanDataContext);
  // instead of passing refreshData, handle update and refresh in the same API call, get the new plan databack and set it to the context.s

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>, data: object) => {
      e.preventDefault();
      if (!plan) return;
      const newChunk: PlanChunk = {
        type: FORM_KEY,
        data,
      };
      const updatedPlanData: Plan = {
        ...plan,
      };
      updatedPlanData.days[0].chunks = updatedPlanData.days[0].chunks || [];
      updatedPlanData.days[0].chunks.push(newChunk);
      await updatePlan(id, updatedPlanData);
    },
    [FORM_KEY, id, plan],
  );

  return { handleSubmit };
};

export default useChunkForm;
