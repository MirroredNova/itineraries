import React from 'react';
import Form from '@/components/shared/Form';
import TextField from '@mui/material/TextField';
import { FormProps } from '@/constants/props';
import { formatDatetimeAsString } from '@/services/utility.services';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Dayjs } from 'dayjs';
import Autocomplete from '@mui/material/Autocomplete';

const FORM_KEY = 'Flight';

const FlightForm = ({ getHandleChunkSubmit }: FormProps) => {
  const [origin, setOrigin] = React.useState<string>('');
  const [destination, setDestination] = React.useState<string>('');
  const [departureDate, setDepartureDate] = React.useState<Dayjs | null>(null);
  const [arrivalDate, setArrivalDate] = React.useState<Dayjs | null>(null);
  const [airports, setAirports] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fetchAirports = async () => {
      const response = await fetch('/api/getAirportCodes');
      const airportData = await response.json();
      setAirports(airportData);
    };
    fetchAirports();
  }, []);

  return (
    <Form
      onSubmit={getHandleChunkSubmit(FORM_KEY, {
        origin,
        destination,
        departureDate: formatDatetimeAsString(departureDate),
        arrivalDate: formatDatetimeAsString(arrivalDate),
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
      <Autocomplete
        id="tags-outlined"
        options={airports}
        filterSelectedOptions
        renderOption={(props, option) => (
          <li {...props} key={option}>
            {option}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Tags" placeholder="Tag" />
        )}
      />
      <DateTimePicker
        label="Departure Date"
        value={departureDate}
        onChange={(newValue) => setDepartureDate(newValue)}
      />
      <DateTimePicker
        label="Arrival Date"
        value={arrivalDate}
        onChange={(newValue) => setArrivalDate(newValue)}
      />
    </Form>
  );
};

export default FlightForm;
