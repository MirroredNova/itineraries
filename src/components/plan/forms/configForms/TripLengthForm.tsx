import React, { useState } from 'react';
import Form from '@/components/shared/Form';
import TextField from '@mui/material/TextField';
import { FormProps } from '@/constants/props';
import MenuItem from '@mui/material/MenuItem';

const units = [
  { label: 'Days', value: 'Days' },
  { label: 'Weeks', value: 'Weeks' },
  { label: 'Months', value: 'Months' },
  { label: 'Years', value: 'Years' },
];

const FORM_KEY = 'Trip Length';

const TripLengthForm = ({ planData, getHandleConfigSubmit }: FormProps) => {
  const [unit, setUnit] = useState<string>(
    planData.configs
      ?.find((config) => config.type === FORM_KEY)
      ?.data.split(' - ')[0] || 'Days',
  );
  const [length, setLength] = useState(
    planData.configs
      ?.find((config) => config.type === FORM_KEY)
      ?.data.split(' - ')[1] || '0',
  );

  return (
    <Form onSubmit={getHandleConfigSubmit(FORM_KEY, `${unit} - ${length}`)}>
      <TextField
        id="unit-select"
        select
        value={unit}
        label="Unit"
        onChange={(e) => setUnit(e.target.value)}
      >
        {units.map((u) => (
          <MenuItem key={u.value} value={u.value}>
            {u.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        type="number"
        placeholder="Trip Length"
        label="Trip Length"
        value={length}
        onChange={(e) => setLength(e.target.value)}
      />
    </Form>
  );
};

export default TripLengthForm;
