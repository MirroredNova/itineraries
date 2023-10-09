'use client';

import { getPlan } from '@/services/firebase.services';
import { useRouter } from 'next/navigation';
import React from 'react';

const ExistingButton = () => {
  const [inputOpen, setInputOpen] = React.useState(false);
  const [planCode, setPlanCode] = React.useState('');
  const [inputError, setInputError] = React.useState(false);
  const { push } = useRouter();

  const existinPlanHandler = async () => {
    const plan = await getPlan(planCode);
    if (!plan) {
      setPlanCode('');
      setInputError(true);
      setTimeout(() => {
        setInputError(false);
      }, 2000);
      return;
    }
    const safeId = encodeURIComponent(planCode);
    push(`/${safeId}`);
  };

  if (inputOpen) {
    return (
      <>
        <input
          type="text"
          maxLength={6}
          className="w-full text-xl border border-secondary-dark rounded-lg text-center p-1"
          name="planCode"
          onChange={(e) => setPlanCode(e.target.value.toUpperCase())}
          placeholder={inputError ? 'Invalid Code' : 'Enter Code'}
          value={planCode}
        />
        <button onClick={existinPlanHandler}>Submit</button>
      </>
    );
  }
  return <button onClick={() => setInputOpen(true)}>Existing Plan</button>;
};

export default ExistingButton;
