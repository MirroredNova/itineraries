import { Plan, PlanConfig } from '@/constants/plan';
import { Card } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import React from 'react';

type Props = {
  plan: Plan;
  id: string;
};

const Information = ({ plan, id }: Props) => (
  <Card className="text-center p-4">
    <h2>
      Unique Code: <b>{id}</b>
    </h2>
    <Divider className="my-2" />
    {plan.configs &&
      plan.configs.map((config: PlanConfig) => (
        <div key={config.type}>
          <p key={config.type}>
            {config.type}:{' '}
            <b>
              <span>{config.data}</span>
            </b>
          </p>
        </div>
      ))}
  </Card>
);

export default Information;
