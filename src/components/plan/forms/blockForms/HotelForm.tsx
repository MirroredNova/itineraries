import Form from '@/components/shared/Form';
import TextField from '@mui/material/TextField';
import React, { FormEvent, useCallback, useState } from 'react';
import useChunkForm from '@/hooks/useChunkForm';
import { Dayjs } from 'dayjs';
import { formatDatetimeAsTimeString } from '@/services/dayjs.services';
import { HotelChunkType } from '@/types/chunks.types';
import { FormTypes } from '@/types/form.types';
import DayTimeInput from '../../inputs/DayTimeInput';

const FORM_KEY = 'Hotel';
const FORM_TYPE: FormTypes = 'split';

const HotelForm = () => {
  const { handleSubmit } = useChunkForm<HotelChunkType>(FORM_KEY, FORM_TYPE);
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
        dayFields: {
          checkIn: {
            day: checkInDay,
            time: formatDatetimeAsTimeString(checkInTime),
          },
          checkOut: {
            day: checkOutDay,
            time: formatDatetimeAsTimeString(checkOutTime),
          },
        },
      });
      setHotelName('');
      setCheckInTime(null);
      setCheckInDay(0);
      setCheckOutTime(null);
      setCheckOutDay(0);
    },
    [
      checkInDay,
      checkInTime,
      checkOutDay,
      checkOutTime,
      handleSubmit,
      hotelName,
    ],
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
        day={checkInDay}
        setDay={setCheckInDay}
        time={checkInTime}
        setTime={setCheckInTime}
        dayLabel={'Check In Day'}
        timeLabel={'Check In Time'}
      />
      <DayTimeInput
        day={checkOutDay}
        setDay={setCheckOutDay}
        time={checkOutTime}
        setTime={setCheckOutTime}
        dayLabel={'Check Out Day'}
        timeLabel={'Check Out Time'}
      />
    </Form>
  );
};

export default HotelForm;
