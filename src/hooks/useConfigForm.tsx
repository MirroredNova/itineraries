import { FormEvent, useContext } from 'react';
import { PlanDataContext } from '@/components/providers/PlanDataProvider';
import { Plan, PlanConfig } from '@/types/plan.types';
import { updatePlan } from '@/services/realtime.services';

type UseConfigFormType = {
  planData: Plan | undefined;
  handleSubmit: (e: FormEvent<HTMLFormElement>, data: string) => void;
};

const useConfigForm = (FORM_KEY: string): UseConfigFormType => {
  const { planData, id } = useContext(PlanDataContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, data: string) => {
    e.preventDefault();
    if (!planData) return;
    const updatedPlanData: Plan = {
      ...planData,
      configs: planData.configs?.slice() ?? [],
    };
    if (data === '') {
      updatedPlanData.configs = updatedPlanData.configs.filter(
        (config) => config.type !== FORM_KEY,
      );
    } else {
      const newConfig: PlanConfig = {
        type: FORM_KEY,
        data,
      };
      const index = updatedPlanData.configs.findIndex(
        (config) => config.type === FORM_KEY,
      );
      if (index > -1) {
        updatedPlanData.configs[index] = newConfig;
      } else {
        updatedPlanData.configs.push(newConfig);
      }
    }
    await updatePlan(id, updatedPlanData);
  };

  return { planData, handleSubmit };
};

export default useConfigForm;
