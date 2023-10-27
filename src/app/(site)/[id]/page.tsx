import Body from '@/components/plan/Body';
import { PlanDataProvider } from '@/components/providers/PlanDataProvider';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: Props) => (
  <main className="h-screen flex justify-center">
    <PlanDataProvider id={id}>
      <Body id={id} />
    </PlanDataProvider>
  </main>
);

export default page;
