import Form from '@/components/shared/Form';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import React from 'react';

const OriginDateForm = () => (
  <Form>
    <Input type="date" placeholder="Origin Date" label="Origin Date" />
    <Button type="submit" color="primary" variant="solid" className="w-fit">
      Add
    </Button>
  </Form>
);

export default OriginDateForm;
