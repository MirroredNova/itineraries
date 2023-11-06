import React from 'react';
import Body from '@/components/plan/Body';
import { PlanDataProvider } from '@/components/providers/PlanDataProvider';

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: Props) => (
  <PlanDataProvider id={id}>
    <Body />
  </PlanDataProvider>
);

export default page;
