import Form from '@/components/shared/Form';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import React, { useState } from 'react';
import { FormProps } from '@/constants/props';

const FORM_KEY = 'Origin Airport';

const OriginAirportForm = ({ planData, getHandleConfigSubmit }: FormProps) => {
  const [originAirport, setOriginAirport] = useState<string>(
    planData.configs?.find((config) => config.type === FORM_KEY)?.data || '',
  );

  return (
    <Form onSubmit={getHandleConfigSubmit(FORM_KEY, originAirport)}>
      <Input
        type="text"
        placeholder="Origin Airport"
        label="Origin Airport"
        value={originAirport}
        onChange={(e) => setOriginAirport(e.target.value)}
      />
      <Button type="submit" color="primary" variant="solid" className="w-fit">
        Add
      </Button>
    </Form>
  );
};

export default OriginAirportForm;
