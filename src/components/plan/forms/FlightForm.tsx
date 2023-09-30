import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import React from 'react';
import Form from '@/components/shared/Form';

const FlightForm = () => (
  <Form>
    <Input type="text" placeholder="Origin Airport" label="Origin Airport" />
    <Input
      type="text"
      placeholder="Destination Airport"
      label="Departure Airport"
    />
    <Input type="date" placeholder="Departure Date" label="Departure Date" />
    <Input type="date" placeholder="Arrival Date" label="Arrival Date" />
    <Button type="submit" color="primary" variant="solid" className="w-fit">
      Add
    </Button>
  </Form>
);

export default FlightForm;
