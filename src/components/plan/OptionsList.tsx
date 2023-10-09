'use client';

import { Card } from '@nextui-org/card';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import React, { useState } from 'react';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { categories } from '@/constants/forms';
import { Plan } from '@/constants/plan';

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

  const renderForm = () =>
    activeOption && activeOption.form ? (
      <activeOption.form
        {...{
          refreshPlanData,
          planData,
          id,
        }}
      />
    ) : null;

  return (
    <div className="flex flex-row gap-4">
      <Card className="p-4 w-fit min-w-fit">
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
