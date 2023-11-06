'use client';

import React, { FormEvent, useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingButton } from '@mui/lab';
import { createPlan, getNewestPlan } from '@/services/realtime.services';
import { defaultPlan } from '@/constants/plan';
import { startingCode, incrementCode } from '@/services/plan.services';
import { AuthContext } from '../providers/AuthProvider';

const CreationButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      if (!user) {
        return;
      }
      const newestPlan = await getNewestPlan();
      const codeToAdd = newestPlan ? newestPlan.key : startingCode;
      const newCode = incrementCode(codeToAdd);
      const success = await createPlan(
        { ...defaultPlan, uid: user.uid },
        newCode,
      );
      if (!success) {
        return;
      }
      const safeId = encodeURIComponent(newCode);
      router.push(`/edit/${safeId}`);
    },
    [router, user],
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
