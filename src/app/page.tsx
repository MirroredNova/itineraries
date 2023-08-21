'use client';

import Card from '@/components/layout/Card';
import { Plan } from '@/constants/plan';
import { sendPlan } from '@/services/firebase.services';
import React from 'react';

const page = () => {
  const buttonPush = () => {
    sendPlan({
      uniqueCode: 'test',
    } as Plan);
  };

  return (
    <main className="flex h-screen justify-center items-center gap-8">
      <Card>
        <button onClick={buttonPush}>Create New</button>
      </Card>
      <Card>
        <button>Find Existing</button>
      </Card>
    </main>
  );
};

export default page;
