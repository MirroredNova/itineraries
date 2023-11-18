import { FormEvent, useCallback, useContext } from 'react';
import { PlanDataContext } from '@/components/providers/PlanDataProvider';
import { Plan, PlanChunk } from '@/types/plan.types';
import { updatePlan } from '@/services/realtime.services';
import { FormTypes } from '@/types/form.types';

type UseChunkFormType<T> = {
  handleSubmit: (e: FormEvent<HTMLFormElement>, data: T) => void;
};

const useChunkForm = <T extends object>(
  FORM_KEY: string,
  FORM_TYPE?: FormTypes,
): UseChunkFormType<T> => {
  const { plan, id } = useContext(PlanDataContext);

  // standard form type should create a single chunk where each dayfield is a property of that chunk
  // split form type should create a chunk for each dayfield
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>, data: T) => {
      e.preventDefault();
      if (!plan) return;

      const updatedPlanData: Plan = {
        ...plan,
      };

      switch (FORM_TYPE) {
        case 'split': {
          break;
        }

        case 'standard': {
          const newChunk: PlanChunk = {
            type: FORM_KEY,
            data,
          };

          updatedPlanData.days[0].chunks = updatedPlanData.days[0].chunks || [];
          updatedPlanData.days[0].chunks.push(newChunk);
          break;
        }
        default:
          break;
      }

      await updatePlan(id, updatedPlanData);
    },
    [FORM_KEY, FORM_TYPE, id, plan],
  );

  return { handleSubmit };
};

export default useChunkForm;
