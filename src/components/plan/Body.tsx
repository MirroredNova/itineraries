'use client';

import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Information from './Information';
import OptionsList from './OptionsList';
import PlanContainer from './PlanContainer';
import { PlanDataContext } from '../providers/PlanDataProvider';

type Props = {
  id: string;
};

const Body = ({ id }: Props) => {
  const { planData, loading } = useContext(PlanDataContext);

  if (loading) {
    return (
      <Card className="p-8 h-fit flex flex-col gap-4 items-center justify-center">
        <div className="text-4xl font-medium">Loading...</div>
        <CircularProgress />
      </Card>
    );
  }

  if (!planData) {
    return (
      <Card className="text-5xl p-12 font-medium h-fit">Plan not found</Card>
    );
  }

  return (
    <div className="flex flex-row gap-4 max-w-7xl w-full justify-between p-6 pt-0">
      <div className="flex flex-col gap-4 w-1/2">
        <Information plan={planData} id={id} />
        <OptionsList />
      </div>
      <PlanContainer plan={planData} />
    </div>
  );
};

export default Body;
