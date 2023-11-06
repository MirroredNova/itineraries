'use client';

import { getPlan } from '@/services/realtime.services';
import { LoadingButton } from '@mui/lab';
import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useCallback, useState } from 'react';

const ExistingButton = () => {
  const [inputOpen, setInputOpen] = useState(false);
  const [planCode, setPlanCode] = useState('');
  const [inputError, setInputError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const submitHandler = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      const plan = await getPlan(planCode);
      if (!plan) {
        setPlanCode('');
        setLoading(false);
        setInputError(true);
        setTimeout(() => {
          setInputError(false);
        }, 2000);
        return;
      }
      const safeId = encodeURIComponent(planCode);
      push(`/edit/${safeId}`);
    },
    [planCode, push],
  );

  if (inputOpen) {
    return (
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <TextField
          type="text"
          inputProps={{ maxLength: 12 }}
          className="w-full text-xl border border-secondary-dark rounded-lg text-center p-1"
          name="planCode"
          onChange={(e) => setPlanCode(e.target.value.toUpperCase())}
          placeholder={inputError ? 'Invalid Code' : 'Enter Code'}
          value={planCode}
        />
        <LoadingButton
          className="font-bold"
          type="submit"
          loading={loading}
          disabled={loading}
        >
          Submit
        </LoadingButton>
      </form>
    );
  }
  return (
    <form>
      <Button onClick={() => setInputOpen(true)} className="font-bold w-full">
        Find Existing
      </Button>
    </form>
  );
};

export default ExistingButton;
