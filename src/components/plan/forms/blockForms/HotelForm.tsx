import Form from '@/components/shared/Form';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import React, { FormEvent, useCallback, useState } from 'react';
import { formatDatetimeAsString } from '@/services/utility.services';
import useChunkForm from '@/hooks/useChunkForm';

const FORM_KEY = 'Hotel';

const HotelForm = () => {
  const { handleSubmit } = useChunkForm(FORM_KEY);
  const [hotelName, setHotelName] = useState<string>('');
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null);

  const handleHotelSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(e, {
        hotelName,
        checkInDate: formatDatetimeAsString(checkInDate),
        checkOutDate: formatDatetimeAsString(checkOutDate),
      });
      setHotelName('');
      setCheckInDate(null);
      setCheckOutDate(null);
    },
    [checkInDate, checkOutDate, handleSubmit, hotelName],
  );

  return (
    <Form onSubmit={handleHotelSubmit}>
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
