import Form from '@/components/shared/Form';
import { FormProps } from '@/constants/props';
import TextField from '@mui/material/TextField';
import React from 'react';

const FORM_KEY = 'Hotel';

const HotelForm = ({ getHandleChunkSubmit }: FormProps) => {
  const [hotelName, setHotelName] = React.useState<string>('');
  const [checkInDate, setCheckInDate] = React.useState<Date>(new Date());
  const [checkOutDate, setCheckOutDate] = React.useState<Date>(new Date());

  return (
    <Form
      onSubmit={getHandleChunkSubmit(FORM_KEY, {
        hotelName,
        checkInDate: checkInDate.toISOString().split('T')[0],
        checkOutDate: checkOutDate.toISOString().split('T')[0],
      })}
    >
      <TextField
        type="text"
        placeholder="Hotel Name"
        label="Hotel Name"
        value={hotelName}
        onChange={(e) => setHotelName(e.target.value)}
      />
      <TextField
        type="date"
        placeholder="Check In Date"
        label="Check In Date"
        value={checkInDate.toISOString().split('T')[0]}
        onChange={(e) => setCheckInDate(new Date(e.target.value))}
      />
      <TextField
        type="date"
        placeholder="Check Out Date"
        label="Check Out Date"
        value={checkOutDate.toISOString().split('T')[0]}
        onChange={(e) => setCheckOutDate(new Date(e.target.value))}
      />
    </Form>
  );
};

export default HotelForm;
