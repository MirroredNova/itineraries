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

  return (
    <main className="h-screen flex justify-center items-center">
      <div className="grid grid-cols-2">
        <Card className="text-5xl p-12 font-medium">
          <p>{planData.uniqueCode}</p>
        </Card>
        <Card className="text-5xl p-12 font-medium">
          <p>{planData.uniqueCode}</p>
        </Card>
        <Card className="text-5xl p-12 font-medium">
          <p>{planData.uniqueCode}</p>
        </Card>
      </div>
    </main>
  );
};

export default page;
