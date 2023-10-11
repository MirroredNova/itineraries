import Form from '@/components/shared/Form';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import React, { useState } from 'react';
import { Select, SelectItem } from '@nextui-org/select';
import { FormProps } from '@/constants/props';

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
      <Select
        items={units}
        label="Length Unit"
        placeholder="Select a unit"
        fullWidth
        value={unit}
        defaultSelectedKeys={[unit]}
        onChange={(e) => setUnit(e.target.value)}
      >
        {(u) => <SelectItem key={u.value}>{u.label}</SelectItem>}
      </Select>
      <Input
        type="number"
        placeholder="Trip Length"
        label="Trip Length"
        value={length}
        onChange={(e) => setLength(e.target.value)}
      />
      <Button type="submit" color="primary" variant="solid" className="w-fit">
        Add
      </Button>
    </Form>
  );
};

export default TripLengthForm;
