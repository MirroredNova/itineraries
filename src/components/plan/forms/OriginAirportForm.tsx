import Form from '@/components/shared/Form';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import React from 'react';

const OriginAirportForm = () => (
  <Form>
    <Input type="text" placeholder="Origin Airport" label="Origin Airport" />
    <Button type="submit" color="primary" variant="solid" className="w-fit">
      Add
    </Button>
  </Form>
);

export default OriginAirportForm;
