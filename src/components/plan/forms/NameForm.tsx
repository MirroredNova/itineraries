import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import React from 'react';

const NameForm = () => (
  <form className="flex flex-col gap-4">
    <Input type="text" placeholder="Plan Name" label="Plan Name" />
    <Button type="submit" color="primary" variant="solid" className="w-fit">
      Add
    </Button>
  </form>
);

export default NameForm;
