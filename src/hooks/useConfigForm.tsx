import { PlanDataContext } from '@/components/providers/PlanDataProvider';
import { PlanConfig, Plan } from '@/constants/plan';
import { updatePlan } from '@/services/realtime.services';
import { FormEvent, useContext } from 'react';

type UseConfigFormType = {
  planData: Plan | undefined;
  handleSubmit: (e: FormEvent<HTMLFormElement>, data: string) => void;
};

const useConfigForm = (FORM_KEY: string): UseConfigFormType => {
  const { planData, id, refreshData } = useContext(PlanDataContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, data: string) => {
    e.preventDefault();
    if (!planData) return;
    const newConfig: PlanConfig = {
      type: FORM_KEY,
      data,
    };
    const index = planData.configs
      ? planData.configs.findIndex((config) => config.type === FORM_KEY)
      : -1;
    const updatedPlanData: Plan = {
      ...planData,
    };
    if (index > -1) {
      updatedPlanData.configs[index] = newConfig;
    } else {
      updatedPlanData.configs = updatedPlanData.configs || [];
      updatedPlanData.configs.push(newConfig);
    }
    await updatePlan(id, updatedPlanData);
    await refreshData();
  };

  return { planData, handleSubmit };
};

export default useConfigForm;
