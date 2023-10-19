import React, { SyntheticEvent } from 'react';
import Form from '@/components/shared/Form';
import TextField from '@mui/material/TextField';
import { FormProps } from '@/constants/props';
import { formatDatetimeAsString } from '@/services/utility.services';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Dayjs } from 'dayjs';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

const FORM_KEY = 'Flight';

const FlightForm = ({ getHandleChunkSubmit }: FormProps) => {
  const [origin, setOrigin] = React.useState<string | null>(null);
  const [destination, setDestination] = React.useState<string>('');
  const [departureDate, setDepartureDate] = React.useState<Dayjs | null>(null);
  const [arrivalDate, setArrivalDate] = React.useState<Dayjs | null>(null);
  const [airports, setAirports] = React.useState<string[]>([]);
  const [typingTimeout, setTypingTimeout] = React.useState<NodeJS.Timeout>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchAirports = async (query: string) => {
    const response = await fetch(`/api/getAirportCodes?query=${query}`);
    const airportData = await response.json();
    setAirports(airportData);
  };

  React.useEffect(() => {
    fetchAirports('');
  }, []);

  const onInputChange = async (
    event: SyntheticEvent<Element, Event>,
    value: string,
  ) => {
    event.preventDefault();
    setOrigin(value || null);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setLoading(true);
    const newTimeout = setTimeout(() => {
      fetchAirports(value);
      setLoading(false);
    }, 500);
    setTypingTimeout(newTimeout);
  };

  return (
    <Form
      onSubmit={getHandleChunkSubmit(FORM_KEY, {
        origin,
        destination,
        departureDate: formatDatetimeAsString(departureDate),
        arrivalDate: formatDatetimeAsString(arrivalDate),
      })}
    >
      <Autocomplete
        id="origin-airport"
        onInputChange={onInputChange}
        options={airports}
        value={origin}
        loading={loading}
        renderOption={(props, option) => (
          <li {...props} key={option}>
            {option}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Origin Airport"
            placeholder="Origin Airport"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <TextField
        type="text"
        placeholder="Destination Airport"
        label="Destination Airport"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
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
