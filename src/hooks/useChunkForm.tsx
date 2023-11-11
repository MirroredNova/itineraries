import { FormEvent, useCallback, useContext } from 'react';
import { PlanDataContext } from '@/components/providers/PlanDataProvider';
import { Plan, PlanChunk } from '@/types/plan.types';
import { updatePlan } from '@/services/realtime.services';

type UseChunkFormType<T> = {
  handleSubmit: (e: FormEvent<HTMLFormElement>, data: T) => void;
};

const useChunkForm = <T extends object>(
  FORM_KEY: string,
): UseChunkFormType<T> => {
  const { plan, id } = useContext(PlanDataContext);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>, data: T) => {
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
