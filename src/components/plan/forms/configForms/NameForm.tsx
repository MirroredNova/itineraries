import React, { FormEvent, useCallback, useState } from 'react';
import Form from '@/components/shared/Form';
import TextField from '@mui/material/TextField';
import useConfigForm from '@/hooks/useConfigForm';

const FORM_KEY = 'Name';

const NameForm = () => {
  const { planData, handleSubmit } = useConfigForm(FORM_KEY);
  const [name, setName] = useState<string>(
    planData?.configs?.find((config) => config.type === FORM_KEY)?.data ?? '',
  );

  const handleNameSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(e, name);
    },
    [handleSubmit, name],
  );

  return (
    <Form onSubmit={handleNameSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Form>
  );
};

export default NameForm;
