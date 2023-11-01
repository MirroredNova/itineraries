import React, { FormEvent, useCallback, useState } from 'react';
import Form from '@/components/shared/Form';
import TextField from '@mui/material/TextField';
import useConfigForm from '@/hooks/useConfigForm';
import { InputAdornment } from '@mui/material';

const FORM_KEY = 'Trip Length';

const TripLengthForm = () => {
  const { planData, handleSubmit } = useConfigForm(FORM_KEY);
  const [length, setLength] = useState(
    planData?.configs
      ?.find((config) => config.type === FORM_KEY)
      ?.data.split(' ')[0] || '0',
  );

  const handleTripLengthSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(e, `${length} days`);
    },
    [handleSubmit, length],
  );

  return (
    <Form onSubmit={handleTripLengthSubmit}>
      <TextField
        type="number"
        placeholder="How many days?"
        label="Trip Length"
        value={length}
        InputProps={{
          endAdornment: <InputAdornment position="end">days</InputAdornment>,
        }}
        onChange={(e) => setLength(e.target.value)}
      />
    </Form>
  );
};

export default TripLengthForm;
