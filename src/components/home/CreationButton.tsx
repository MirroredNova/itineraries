'use client';

import { defaultPlan } from '@/constants/plan';
import { getNewestPlan, createPlan } from '@/services/firebase.services';
import { incrementCode, startingCode } from '@/services/plan.services';
import { useRouter } from 'next/navigation';
import React from 'react';

const CreationButton = () => {
  const { push } = useRouter();

  const newPlanHandler = async () => {
    const newestPlan = await getNewestPlan();
    const codeToAdd = newestPlan ? newestPlan.key : startingCode;
    const newCode = incrementCode(codeToAdd);
    const success = await createPlan(defaultPlan, newCode);
    if (!success) {
      return;
    }
    const safeId = encodeURIComponent(newCode);
    push(`/${safeId}`);
  };

  return <button onClick={newPlanHandler}>Create New</button>;
};

export default CreationButton;
