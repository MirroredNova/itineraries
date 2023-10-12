import React, { useState } from 'react';
import Form from '@/components/shared/Form';
import { FormProps } from '@/constants/props';
import TextField from '@mui/material/TextField';

const FORM_KEY = 'Name';

const NameForm = ({ getHandleConfigSubmit, planData }: FormProps) => {
  const [name, setName] = useState(
    planData.configs?.find((config) => config.type === FORM_KEY)?.data || '',
  );

  return (
    <Form onSubmit={getHandleConfigSubmit(FORM_KEY, name)}>
      <TextField
        type="text"
        placeholder="Plan Name"
        label="Plan Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Form>
  );
};

export default NameForm;
