import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import React, { useState } from 'react';
import Form from '@/components/shared/Form';
import { FormProps } from '@/constants/props';

const FORM_KEY = 'Name';

const NameForm = ({ getHandleConfigSubmit, planData }: FormProps) => {
  const [name, setName] = useState(
    planData.configs?.find((config) => config.type === FORM_KEY)?.data || '',
  );

  return (
    <Form onSubmit={getHandleConfigSubmit(FORM_KEY, name)}>
      <Input
        type="text"
        placeholder="Plan Name"
        label="Plan Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit" color="primary" variant="solid" className="w-fit">
        Add
      </Button>
    </Form>
  );
};

export default NameForm;
