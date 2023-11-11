import React, { FormEvent, useCallback, useState } from 'react';
import Form from '@/components/shared/Form';
import { formatDatetimeAsTimeString } from '@/services/dayjs.services';
import { Dayjs } from 'dayjs';
import useChunkForm from '@/hooks/useChunkForm';
import { AirportLocal } from '@/types/airport.types';
import { FlightChunkType } from '@/types/chunks.types';
import { TimePicker } from '@mui/x-date-pickers';
import AirportAutocomplete from '../../inputs/AirportAutocomplete';

const FORM_KEY = 'Flight';

const FlightForm = () => {
  const { handleSubmit } = useChunkForm<FlightChunkType>(FORM_KEY);
  const [origin, setOrigin] = useState<null | AirportLocal>(null);
  const [destination, setDestination] = useState<null | AirportLocal>(null);
  const [departureDate, setDepartureDate] = useState<Dayjs | null>(null);
  const [arrivalDate, setArrivalDate] = useState<Dayjs | null>(null);

  const handleFlightSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(e, {
        origin: origin!,
        destination: destination!,
        departureTime: formatDatetimeAsTimeString(departureDate!),
        arrivalTime: formatDatetimeAsTimeString(arrivalDate!),
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
      <TimePicker
        label="Departure Time"
        value={departureDate}
        onChange={(newValue) => {
          setDepartureDate(newValue);
        }}
      />
      <TimePicker
        label="Arrival Time"
        value={arrivalDate}
        onChange={(newValue) => {
          setArrivalDate(newValue);
        }}
      />
    </Form>
  );
};

export default FlightForm;
