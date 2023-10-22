import React from 'react';
import Form from '@/components/shared/Form';
import { FormProps } from '@/constants/props';
import { formatDatetimeAsString } from '@/services/utility.services';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Dayjs } from 'dayjs';

import AirportAutocomplete from '../../inputs/AirportAutocomplete';

const FORM_KEY = 'Flight';

const FlightForm = ({ getHandleChunkSubmit }: FormProps) => {
  const [origin, setOrigin] = React.useState<string | null>(null);
  const [destination, setDestination] = React.useState<string | null>(null);
  const [departureDate, setDepartureDate] = React.useState<Dayjs | null>(null);
  const [arrivalDate, setArrivalDate] = React.useState<Dayjs | null>(null);

  return (
    <Form
      onSubmit={getHandleChunkSubmit(FORM_KEY, {
        origin,
        destination,
        departureDate: formatDatetimeAsString(departureDate),
        arrivalDate: formatDatetimeAsString(arrivalDate),
      })}
    >
      <AirportAutocomplete
        value={origin}
        setValue={setOrigin}
        label="Origin Airport"
      />
      <AirportAutocomplete
        value={destination}
        setValue={setDestination}
        label="Destination Airport"
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
