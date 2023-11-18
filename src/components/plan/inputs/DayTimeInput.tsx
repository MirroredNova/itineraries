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
  dayRequired?: boolean;
  timeRequired?: boolean;
};

const DayTimeInput = ({
  day,
  setDay,
  time,
  setTime,
  dayLabel,
  timeLabel,
  dayRequired = false,
  timeRequired = false,
}: Props) => (
  <Stack spacing={2} direction="row">
    <TextField
      label={dayLabel}
      type="number"
      placeholder={dayLabel}
      value={day}
      required={dayRequired}
      onChange={(e) => setDay(Number(e.target.value))}
      InputProps={{
        inputProps: {
          min: 0,
        },
      }}
    />
    <TimePicker
      label={timeLabel}
      value={time}
      onChange={(newValue) => setTime(newValue)}
      slotProps={{
        textField: {
          required: timeRequired,
        },
      }}
    />
  </Stack>
);

export default DayTimeInput;
