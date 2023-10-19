import Form from '@/components/shared/Form';
import { FormProps } from '@/constants/props';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import React from 'react';
import { formatDatetimeAsString } from '@/services/utility.services';

const FORM_KEY = 'Hotel';

const HotelForm = ({ getHandleChunkSubmit }: FormProps) => {
  const [hotelName, setHotelName] = React.useState<string>('');
  const [checkInDate, setCheckInDate] = React.useState<Dayjs | null>(null);
  const [checkOutDate, setCheckOutDate] = React.useState<Dayjs | null>(null);

  return (
    <Form
      onSubmit={getHandleChunkSubmit(FORM_KEY, {
        hotelName,
        checkInDate: formatDatetimeAsString(checkInDate),
        checkOutDate: formatDatetimeAsString(checkOutDate),
      })}
    >
      <TextField
        type="text"
        placeholder="Hotel Name"
        label="Hotel Name"
        value={hotelName}
        onChange={(e) => setHotelName(e.target.value)}
      />
      <DateTimePicker
        label="Check In Date"
        value={checkInDate}
        onChange={(newValue) => setCheckInDate(newValue)}
      />
      <DateTimePicker
        label="Check Out Date"
        value={checkOutDate}
        onChange={(newValue) => setCheckOutDate(newValue)}
      />
    </Form>
  );
};

export default HotelForm;
