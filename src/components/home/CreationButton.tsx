'use client';

import { Plan } from '@/constants/plan';
import { getNewestPlan, sendPlan } from '@/services/firebase.services';
import { incrementCode, startingCode } from '@/services/plan.services';
import { useRouter } from 'next/navigation';
import React from 'react';

const CreationButton = () => {
  const { push } = useRouter();

  const newPlanHandler = async () => {
    const newestPlan = await getNewestPlan();
    let planToAdd = {};
    if (newestPlan) {
      planToAdd = {
        uniqueCode: incrementCode(newestPlan.uniqueCode),
      };
    } else {
      planToAdd = {
        uniqueCode: startingCode,
      };
    }
    const planKey = sendPlan(planToAdd as Plan);
    const safeId = encodeURIComponent(planKey);
    push(`/${safeId}`);
  };

  return <button onClick={newPlanHandler}>Create New</button>;
};

export default CreationButton;
