import Body from '@/components/plan/Body';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params: { id } }: Props) => (
  <main className="h-screen flex justify-center">
    <Body id={id} />
  </main>
);

export default page;
