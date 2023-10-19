import React from 'react';
import Form from '@/components/shared/Form';
import { FormProps } from '@/constants/props';
import {
  formatDatetimeAsString,
  parseDatetimeFromString,
} from '@/services/utility.services';
import { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const FORM_KEY = 'Origin Date';

const OriginDateForm = ({ planData, getHandleConfigSubmit }: FormProps) => {
  const [originDate, setOriginDate] = React.useState<Dayjs | null>(
    planData.configs
      ? parseDatetimeFromString(
          planData.configs.find((config) => config.type === FORM_KEY)?.data,
        )
      : null,
  );

  return (
    <Form
      onSubmit={getHandleConfigSubmit(
        FORM_KEY,
        formatDatetimeAsString(originDate),
      )}
    >
      <DateTimePicker
        label="Origin Date"
        value={originDate}
        onChange={(newValue) => setOriginDate(newValue)}
      />
    </Form>
  );
};

export default OriginDateForm;
