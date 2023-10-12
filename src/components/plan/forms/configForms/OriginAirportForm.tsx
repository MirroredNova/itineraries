import Form from '@/components/shared/Form';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { FormProps } from '@/constants/props';

const FORM_KEY = 'Origin Airport';

const OriginAirportForm = ({ planData, getHandleConfigSubmit }: FormProps) => {
  const [originAirport, setOriginAirport] = useState<string>(
    planData.configs?.find((config) => config.type === FORM_KEY)?.data || '',
  );

  return (
    <Form onSubmit={getHandleConfigSubmit(FORM_KEY, originAirport)}>
      <TextField
        type="text"
        placeholder="Origin Airport"
        label="Origin Airport"
        value={originAirport}
        onChange={(e) => setOriginAirport(e.target.value)}
      />
    </Form>
  );
};

export default OriginAirportForm;
