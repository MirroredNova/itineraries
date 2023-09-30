'use client';

import { Card } from '@nextui-org/card';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import React from 'react';
import { categories } from '@/constants/plan';
import { Listbox, ListboxItem } from '@nextui-org/listbox';

const OptionsList = () => {
  const [activeForm, setActiveForm] = React.useState<JSX.Element>(
    categories[0].options[0].form,
  );

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
                    onPress={() => setActiveForm(item.form)}
                  >
                    {item.accordionLabel}
                  </ListboxItem>
                )}
              </Listbox>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
      <Card className="p-4 grow h-fit">{activeForm}</Card>
    </div>
  );
};

export default OptionsList;
