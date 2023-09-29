import { Plan } from '@/constants/plan';
import { Card } from '@nextui-org/card';
import React from 'react';

type Props = {
  plan: Plan;
};

const Information = ({ plan }: Props) => (
  <Card className="text-center p-4">
    <h2>
      Unique Code: <b>{plan.uniqueCode}</b>
    </h2>
  </Card>
);

export default Information;
