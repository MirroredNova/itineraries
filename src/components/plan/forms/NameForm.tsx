import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import React, { useState } from 'react';
import { Plan, PlanConfig } from '@/constants/plan';
import { updatePlan } from '@/services/firebase.services';
import Form from '@/components/shared/Form';

type Props = {
  refreshPlanData: () => void;
  planData: Plan;
  id: string;
};

const FORM_KEY = 'Name';

const NameForm = ({ refreshPlanData, planData, id }: Props) => {
  const [name, setName] = useState(
    planData.configs?.find((config) => config.type === FORM_KEY)?.data || '',
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const nameConfig: PlanConfig = {
      type: FORM_KEY,
      data: name,
    };
    const index = planData.configs
      ? planData.configs.findIndex((config) => config.type === FORM_KEY)
      : -1;
    const updatedPlanData: Plan = {
      ...planData,
    };
    if (index > -1) {
      updatedPlanData.configs[index] = nameConfig;
    } else {
      updatedPlanData.configs = updatedPlanData.configs || [];
      updatedPlanData.configs.push(nameConfig);
    }
    updatePlan(id, updatedPlanData);
    refreshPlanData();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Plan Name"
        label="Plan Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit" color="primary" variant="solid" className="w-fit">
        Add
      </Button>
    </Form>
  );
};

export default NameForm;
