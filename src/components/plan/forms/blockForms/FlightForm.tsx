import React from 'react';
import Form from '@/components/shared/Form';
import TextField from '@mui/material/TextField';
import { FormProps } from '@/constants/props';
import { formatDate } from '@/services/utility.services';

const FORM_KEY = 'Flight';

const FlightForm = ({ getHandleChunkSubmit }: FormProps) => {
  const [origin, setOrigin] = React.useState<string>('');
  const [destination, setDestination] = React.useState<string>('');
  const [departureDate, setDepartureDate] = React.useState<Date>(new Date());
  const [arrivalDate, setArrivalDate] = React.useState<Date>(new Date());

  return (
    <Form
      onSubmit={getHandleChunkSubmit(FORM_KEY, {
        origin,
        destination,
        departureDate: formatDate(departureDate),
        arrivalDate: formatDate(arrivalDate),
      })}
    >
      <TextField
        type="text"
        placeholder="Origin Airport"
        label="Origin Airport"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <TextField
        type="text"
        placeholder="Destination Airport"
        label="Destination Airport"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      {/* <Autocomplete
        id="tags-outlined"
        options={top100Films}
        filterSelectedOptions
        renderOption={(props, option) => (
          <li {...props} key={option.label}>
            {option.label}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Tags" placeholder="Tag" />
        )}
      /> */}
      <TextField
        type="date"
        placeholder="Departure Date"
        label="Departure Date"
        InputLabelProps={{ shrink: true }}
        value={departureDate.toISOString().split('T')[0]}
        onChange={(e) => setDepartureDate(new Date(e.target.value))}
      />
      <TextField
        type="date"
        placeholder="Arrival Date"
        label="Arrival Date"
        InputLabelProps={{ shrink: true }}
        value={arrivalDate.toISOString().split('T')[0]}
        onChange={(e) => setArrivalDate(new Date(e.target.value))}
      />
    </Form>
  );
};

export default FlightForm;
