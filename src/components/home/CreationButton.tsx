'use client';

import { Plan } from '@/constants/plan';
import { sendPlan } from '@/services/firebase.services';
import { useRouter } from 'next/navigation';
import React from 'react';

const CreationButton = () => {
  const { push } = useRouter();

  const newPlanHandler = () => {
    const planKey = sendPlan({
      uniqueCode: '1423',
    } as Plan);
    const safeId = encodeURIComponent(planKey);
    push(`/${safeId}`);
  };

  return <button onClick={newPlanHandler}>Create New</button>;
};

export default CreationButton;
