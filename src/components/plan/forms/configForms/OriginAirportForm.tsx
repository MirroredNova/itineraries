import Form from '@/components/shared/Form';
import React, { useState } from 'react';
import { FormProps } from '@/constants/props';
import AirportAutocomplete from '../../inputs/AirportAutocomplete';

const FORM_KEY = 'Origin Airport';

const OriginAirportForm = ({ planData, getHandleConfigSubmit }: FormProps) => {
  const [originAirport, setOriginAirport] = useState<string | null>(
    planData.configs?.find((config) => config.type === FORM_KEY)?.data || null,
  );

  return (
    <Form onSubmit={getHandleConfigSubmit(FORM_KEY, originAirport)}>
      <AirportAutocomplete
        value={originAirport}
        setValue={setOriginAirport}
        label="Origin Airport"
      />
    </Form>
  );
};

export default OriginAirportForm;
