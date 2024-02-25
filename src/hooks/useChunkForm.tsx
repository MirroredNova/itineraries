import { FormEvent, useCallback, useContext } from 'react';
import { PlanDataContext } from '@/components/providers/PlanDataProvider';
import { Plan, PlanChunk } from '@/types/plan.types';
import {
  addDaysUpto,
  dayExists,
  updatePlan,
} from '@/services/realtime.services';
import { FormTypes } from '@/types/form.types';
import { DayField } from '@/types/chunks.types';

type UseChunkFormType<T> = {
  handleSubmit: (e: FormEvent<HTMLFormElement>, data: T) => void;
};

type ChunkFormObject = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  dayFields: DayField[];
};

const useChunkForm = <T extends ChunkFormObject>(
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

        // standard type should have a single chunk, except when the chunk extends over multiple days
        // in that case, the chunk should be split into multiple chunks
        // first: check if the days in the chunk are in the same day or not
        //    if they are, check that that day exists in the plan
        //      if it does, create a single chunk for that chunk
        //      if it does not, create the days that are missing and then create the chunk
        //    if they are not, check that the days that the chunk cover exist in the plan
        //      if they do, create a chunk for each day
        //      if they do not, create the days that are missing and then create a chunk for each day
        case 'standard': {
          const newChunk: PlanChunk = {
            type: FORM_KEY,
            data,
          };

          // sameDay should be true if all of the dayFields on data are the same number
          const { day } = data.dayFields[0];
          const sameDay = data.dayFields.every(
            (dayField) => dayField.day === day,
          );

          if (sameDay) {
            if (await dayExists(id, day)) {
              updatedPlanData.days[day].chunks =
                updatedPlanData.days[day].chunks || [];
              updatedPlanData.days[day].chunks.push(newChunk);
            } else {
              await addDaysUpto(id, day);
              updatedPlanData.days[day].chunks =
                updatedPlanData.days[day].chunks || [];
              updatedPlanData.days[day].chunks.push(newChunk);
            }
          }
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
