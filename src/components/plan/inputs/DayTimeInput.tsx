import { Stack, TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import React from 'react';

type Props = {
  day: number;
  setDay: (value: number) => void;
  time: Dayjs | null;
  setTime: (value: Dayjs | null) => void;
  dayLabel: string;
  timeLabel: string;
};

const DayTimeInput = ({
  day,
  setDay,
  time,
  setTime,
  dayLabel,
  timeLabel,
}: Props) => (
  <Stack spacing={2} direction="row">
    <TextField
      label={dayLabel}
      type="number"
      placeholder={dayLabel}
      value={day}
      onChange={(e) => setDay(Number(e.target.value))}
    />
    <TimePicker
      label={timeLabel}
      value={time}
      onChange={(newValue) => setTime(newValue)}
    />
  </Stack>
);

export default DayTimeInput;
