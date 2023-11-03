'use client';

import React, { FormEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingButton } from '@mui/lab';

const CreationButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const res = await fetch('/api/plan/createPlan');
      const newCode = (await res.json()).code as string;
      const safeId = encodeURIComponent(newCode);
      router.push(`/${safeId}`);
    },
    [router],
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
