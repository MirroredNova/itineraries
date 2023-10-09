'use client';

import React, { useEffect, useCallback, useState } from 'react';
import { getPlan } from '@/services/firebase.services';
import { Plan } from '@/constants/plan';
import { Card } from '@nextui-org/card';
import Information from './Information';
import OptionsList from './OptionsList';
import PlanContainer from './PlanContainer';

type Props = {
  id: string;
};

const getPlanData = async (id: string) => {
  const planData = await getPlan(id);
  return planData;
};

const Body = ({ id }: Props) => {
  const [planData, setPlanData] = useState<Plan>();
  const [loading, setLoading] = useState(true);

  const getPlanDataAsync = useCallback(async () => {
    setLoading(true);
    const planDataRes = await getPlanData(id);
    if (planDataRes) {
      setPlanData(planDataRes);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getPlanDataAsync();
  }, [getPlanDataAsync, id]);

  if (!planData && !loading) {
    return (
      <Card className="text-5xl p-12 font-medium h-fit mt-24">
        Plan not found
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="text-5xl p-12 font-medium h-fit mt-24">Loading...</Card>
    );
  }

  return (
    <div className="flex flex-row gap-4 max-w-7xl w-full justify-between p-6 pt-24">
      {planData && !loading && (
        <>
          <div className="flex flex-col gap-4 w-1/2">
            <Information plan={planData} id={id} />
            <OptionsList
              refreshPlanData={getPlanDataAsync}
              planData={planData}
              id={id}
            />
          </div>
          <PlanContainer plan={planData} />
        </>
      )}
    </div>
  );
};

export default Body;
