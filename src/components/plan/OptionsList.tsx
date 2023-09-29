import { Card } from '@nextui-org/card';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import React from 'react';

const OptionsList = () => (
  <Card className="p-4 w-1/2">
    <Accordion>
      <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
        Travel
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
        Hotel
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
        Hotel
      </AccordionItem>
    </Accordion>
  </Card>
);

export default OptionsList;
