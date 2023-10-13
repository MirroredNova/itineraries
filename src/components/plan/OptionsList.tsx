import React, { useState } from 'react';
import Card from '@mui/material/Card';
import { categories } from '@/constants/forms';
import { Plan, PlanConfig } from '@/constants/plan';
import { updatePlan } from '@/services/firebase.services';
import { Divider, List } from '@mui/material';
import OptionsListItem from './OptionsListItem';

type Props = {
  refreshPlanData: () => void;
  planData: Plan;
  id: string;
};

const OptionsList = ({ refreshPlanData, planData, id }: Props) => {
  const [activeSelection, setActiveSelection] = useState({
    categoryId: categories[0].id,
    optionId: categories[0].options[0].id,
  });

  const activeCategory = categories.find(
    (category) => category.id === activeSelection.categoryId,
  );
  const activeOption =
    activeCategory &&
    activeCategory.options.find(
      (option) => option.id === activeSelection.optionId,
    );

  const getHandleConfigSubmit =
    (FORM_KEY: string, data: string | undefined) =>
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      if (!data) return;
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
      updatePlan(id, updatedPlanData);
      refreshPlanData();
    };

  const renderForm = () =>
    activeOption && activeOption.form ? (
      <activeOption.form
        {...{
          planData,
          getHandleConfigSubmit,
        }}
      />
    ) : null;

  return (
    <div className="flex flex-row gap-4">
      <Card className="w-fit min-w-fit h-fit">
        <List>
          {categories.map((category, i) => (
            <>
              <OptionsListItem
                key={category.id}
                category={category}
                setActiveSelection={setActiveSelection}
              />
              {i < categories.length - 1 && <Divider className="my-2" />}
            </>
          ))}
        </List>
      </Card>
      <Card className="p-4 grow h-fit">{renderForm()}</Card>
    </div>
  );
};

export default OptionsList;
