'use client';

import React, { FormEvent, useCallback, useState } from 'react';
import { defaultPlan } from '@/constants/plan';
import { getNewestPlan, createPlan } from '@/services/realtime.services';
import { incrementCode, startingCode } from '@/services/plan.services';
import { useRouter } from 'next/navigation';
import { LoadingButton } from '@mui/lab';

const CreationButton = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const newestPlan = await getNewestPlan();
      const codeToAdd = newestPlan ? newestPlan.key : startingCode;
      const newCode = incrementCode(codeToAdd);
      const success = await createPlan(defaultPlan, newCode);
      if (!success) {
        return;
      }
      const safeId = encodeURIComponent(newCode);
      push(`/${safeId}`);
    },
    [push],
  );

  return (
    <form onSubmit={handleSubmit}>
      <LoadingButton
        className="font-bold w-full"
        loading={loading}
        disabled={loading}
        type="submit"
      >
        Create New
      </LoadingButton>
    </form>
  );
};

export default CreationButton;
