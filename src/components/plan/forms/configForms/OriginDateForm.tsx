import React from 'react';
import Form from '@/components/shared/Form';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { FormProps } from '@/constants/props';
import { formatDate } from '@/services/utility.services';

const FORM_KEY = 'Origin Date';

const OriginDateForm = ({ planData, getHandleConfigSubmit }: FormProps) => {
  const [originDate, setOriginDate] = React.useState<Date>(
    new Date(
      planData.configs?.find((config) => config.type === FORM_KEY)?.data || '',
    ),
  );

  return (
    <Form onSubmit={getHandleConfigSubmit(FORM_KEY, formatDate(originDate))}>
      <Input
        type="date"
        placeholder="Origin Date"
        label="Origin Date"
        value={originDate.toISOString().split('T')[0]}
        onChange={(e) => setOriginDate(new Date(e.target.value))}
      />
      <Button type="submit" color="primary" variant="solid" className="w-fit">
        Add
      </Button>
    </Form>
  );
};

export default OriginDateForm;
