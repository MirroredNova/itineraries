import Body from '@/components/plan/Body';
import { PlanDataProvider } from '@/components/providers/PlanDataProvider';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: Props) => (
  <PlanDataProvider id={id}>
    <Body id={id} />
  </PlanDataProvider>
);

export default page;
