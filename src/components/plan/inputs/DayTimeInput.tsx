import { Stack, TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import React from 'react';

type Props = {
  checkInDay: number;
  setCheckInDay: (value: number) => void;
  checkInTime: Dayjs | null;
  setCheckInTime: (value: Dayjs | null) => void;
  dayLabel: string;
  timeLabel: string;
};

const DayTimeInput = ({
  checkInDay,
  setCheckInDay,
  checkInTime,
  setCheckInTime,
  dayLabel,
  timeLabel,
}: Props) => (
  <Stack spacing={2} direction="row">
    <TextField
      label={dayLabel}
      type="number"
      placeholder={dayLabel}
      value={checkInDay}
      onChange={(e) => setCheckInDay(Number(e.target.value))}
    />
    <TimePicker
      label={timeLabel}
      value={checkInTime}
      onChange={(newValue) => setCheckInTime(newValue)}
    />
  </Stack>
);

export default DayTimeInput;
