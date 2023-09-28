import { Plan } from '@/constants/plan';
import React from 'react';
import Card from '../shared/Card';

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
