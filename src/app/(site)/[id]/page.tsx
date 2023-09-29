import Information from '@/components/plan/Information';
import OptionsList from '@/components/plan/OptionsList';
import PlanContainer from '@/components/plan/PlanContainer';
import Card from '@/components/shared/Card';
import { getPlan } from '@/services/firebase.services';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: Props) => {
  const planData = await getPlan(id);

  if (!planData) {
    return (
      <main className="h-screen flex justify-center items-center">
        <Card className="text-5xl p-12 font-medium">Plan not found</Card>
      </main>
    );
  }

  return (
    <main className="h-screen">
      <div className="flex justify-center">
        <div className="flex flex-row gap-4 max-w-5xl w-full justify-between p-6 pt-24">
          <div className="flex flex-col gap-4 w-1/2">
            <Information plan={planData} />
            <div className="flex flex-row gap-4">
              <OptionsList />
              <Card className="p-4 w-1/2">Form Card</Card>
            </div>
          </div>
          <PlanContainer plan={planData} />
        </div>
      </div>
    </main>
  );
};

export default page;
