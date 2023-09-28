import CreationButton from '@/components/home/CreationButton';
import Description from '@/components/home/Description';
import ExistingButton from '@/components/home/ExistingButton';
import Card from '@/components/shared/Card';
import React from 'react';

const page = () => (
  <main className="h-screen flex justify-center items-center">
    <div className="grid gap-1 grid-cols-2 max-w-2xl">
      <Card className="p-12 col-span-full flex flex-col gap-4 text-secondary-dark">
        <Description />
      </Card>
      <Card className="text-5xl p-12 font-medium hover:bg-secondary-light-hover">
        <CreationButton />
      </Card>
      <Card className="text-5xl p-12 font-medium hover:bg-secondary-light-hover flex flex-col justify-between h-full">
        <ExistingButton />
      </Card>
    </div>
  </main>
);

export default page;
