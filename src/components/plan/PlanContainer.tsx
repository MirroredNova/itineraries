import { Plan } from '@/constants/plan';
import React from 'react';
import Card from '../shared/Card';

type Props = {
  plan: Plan;
};

const PlanContainer = ({ plan }: Props) => (
  <Card className="flex flex-col p-4 w-1/2">
    <div className="flex flex-row gap-4">
      <h2>Your Plan</h2>
      <button type="button">Save</button>
    </div>
    <div>
      {plan.chunks && plan.chunks.map((chunk, i) => <p key={+i}>{chunk}</p>)}
    </div>
  </Card>
);

export default PlanContainer;
