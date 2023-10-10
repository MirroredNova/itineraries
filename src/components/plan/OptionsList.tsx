import { Card } from '@nextui-org/card';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import React, { useState } from 'react';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { categories } from '@/constants/forms';
import { Plan, PlanConfig } from '@/constants/plan';
import { updatePlan } from '@/services/firebase.services';

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
    (FORM_KEY: string, data: string) =>
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
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
      <Card className="p-4 w-fit min-w-fit h-fit">
        <Accordion
          isCompact
          selectionMode="multiple"
          defaultExpandedKeys={['1']}
        >
          {categories.map((category) => (
            <AccordionItem
              key={category.id}
              aria-label={category.headerLabel}
              title={category.headerLabel}
            >
              <Listbox items={category.options} aria-label="dynamic listbox">
                {(item) => (
                  <ListboxItem
                    key={item.id}
                    onPress={() =>
                      setActiveSelection({
                        categoryId: category.id,
                        optionId: item.id,
                      })
                    }
                  >
                    {item.accordionLabel}
                  </ListboxItem>
                )}
              </Listbox>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
      <Card className="p-4 grow h-fit">{renderForm()}</Card>
    </div>
  );
};

export default OptionsList;
