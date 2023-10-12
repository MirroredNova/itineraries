import { Plan } from '@/constants/plan';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from 'react';

type Props = {
  plan: Plan;
};

const PlanContainer = ({ plan }: Props) => (
  <Card className="flex flex-col w-1/2 h-fit">
    <CardContent className="flex flex-row justify-around">
      <h2>
        <b>Your Plan</b>
      </h2>
      <Button variant="contained" type="submit" className="w-fit bg-primary">
        Save
      </Button>
    </CardContent>
    <CardContent>
      {plan.chunks && plan.chunks.map((chunk, i) => <p key={+i}>{chunk}</p>)}
    </CardContent>
  </Card>
);

export default PlanContainer;
