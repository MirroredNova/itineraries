import Form from '@/components/shared/Form';
import TextField from '@mui/material/TextField';
import React, { FormEvent, useCallback, useState } from 'react';
import useChunkForm from '@/hooks/useChunkForm';
import { Dayjs } from 'dayjs';
import { formatDatetimeAsTimeString } from '@/services/dayjs.services';
import { HotelChunkType } from '@/types/chunks.types';
import DayTimeInput from '../../inputs/DayTimeInput';

const FORM_KEY = 'Hotel';
// const FORM_TYPE = 'split';

const HotelForm = () => {
  const { handleSubmit } = useChunkForm<HotelChunkType>(FORM_KEY);
  const [hotelName, setHotelName] = useState<string>('');
  const [checkInDay, setCheckInDay] = useState<number>(0);
  const [checkOutDay, setCheckOutDay] = useState<number>(0);
  const [checkInTime, setCheckInTime] = React.useState<Dayjs | null>(null);
  const [checkOutTime, setCheckOutTime] = React.useState<Dayjs | null>(null);

  const handleHotelSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(e, {
        hotelName,
        checkInTime: formatDatetimeAsTimeString(checkInTime),
        checkOutTime: formatDatetimeAsTimeString(checkOutTime),
      });
      setHotelName('');
      setCheckInTime(null);
      setCheckOutTime(null);
    },
    [checkInTime, checkOutTime, handleSubmit, hotelName],
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
      <DayTimeInput
        checkInDay={checkInDay}
        setCheckInDay={setCheckInDay}
        checkInTime={checkInTime}
        setCheckInTime={setCheckInTime}
        dayLabel={'Check In Day'}
        timeLabel={'Check In Time'}
      />
      <DayTimeInput
        checkInDay={checkOutDay}
        setCheckInDay={setCheckOutDay}
        checkInTime={checkOutTime}
        setCheckInTime={setCheckOutTime}
        dayLabel={'Check Out Day'}
        timeLabel={'Check Out Time'}
      />
    </Form>
  );
};

export default HotelForm;
