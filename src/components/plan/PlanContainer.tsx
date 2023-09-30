import { Plan } from '@/constants/plan';
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import React from 'react';

type Props = {
  plan: Plan;
};

const PlanContainer = ({ plan }: Props) => (
  <Card className="flex flex-col w-1/2 h-fit">
    <CardHeader className="justify-around">
      <h2>
        <b>Your Plan</b>
      </h2>
      <Button color="primary" variant="solid">
        Save
      </Button>
    </CardHeader>
    <CardBody>
      {plan.chunks && plan.chunks.map((chunk, i) => <p key={+i}>{chunk}</p>)}
    </CardBody>
  </Card>
);

export default PlanContainer;
