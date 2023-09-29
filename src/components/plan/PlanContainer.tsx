import { Plan } from '@/constants/plan';
import { Card } from '@nextui-org/card';
import React from 'react';

type Props = {
  plan: Plan;
};

const PlanContainer = ({ plan }: Props) => (
  <Card className="flex flex-col p-4 w-1/2 h-fit">
    <div className="flex flex-row gap-4 justify-around">
      <h2><b>Your Plan</b></h2>
      <button type="button">Save</button>
    </div>
    <div>
      {plan.chunks && plan.chunks.map((chunk, i) => <p key={+i}>{chunk}</p>)}
    </div>
  </Card>
);

export default PlanContainer;
