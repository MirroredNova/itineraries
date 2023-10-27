import React, { FormEvent, useCallback, useState } from 'react';
import Form from '@/components/shared/Form';
import { formatDatetimeAsString } from '@/services/utility.services';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Dayjs } from 'dayjs';
import { AirportLocal } from '@/constants/airports';
import useChunkForm from '@/hooks/useChunkForm';
import AirportAutocomplete from '../../inputs/AirportAutocomplete';

const FORM_KEY = 'Flight';

const FlightForm = () => {
  const { handleSubmit } = useChunkForm(FORM_KEY);
  const [origin, setOrigin] = useState<null | AirportLocal>(null);
  const [destination, setDestination] = useState<null | AirportLocal>(null);
  const [departureDate, setDepartureDate] = useState<Dayjs | null>(null);
  const [arrivalDate, setArrivalDate] = useState<Dayjs | null>(null);

  const handleFlightSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(e, {
        origin,
        destination,
        departureDate: formatDatetimeAsString(departureDate),
        arrivalDate: formatDatetimeAsString(arrivalDate),
      });
      setOrigin(null);
      setDestination(null);
      setDepartureDate(null);
      setArrivalDate(null);
    },
    [arrivalDate, departureDate, destination, handleSubmit, origin],
  );

  return (
    <Form onSubmit={handleFlightSubmit}>
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
