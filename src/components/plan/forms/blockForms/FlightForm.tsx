import React, { FormEvent, useCallback, useState } from 'react';
import Form from '@/components/shared/Form';
import { formatDatetimeAsTimeString } from '@/services/dayjs.services';
import { Dayjs } from 'dayjs';
import useChunkForm from '@/hooks/useChunkForm';
import { AirportLocal } from '@/types/airport.types';
import { FlightChunkType } from '@/types/chunks.types';
import { FormTypes } from '@/types/form.types';
import AirportAutocomplete from '../../inputs/AirportAutocomplete';
import DayTimeInput from '../../inputs/DayTimeInput';

const FORM_KEY = 'Flight';
const FORM_TYPE: FormTypes = 'standard';

const FlightForm = () => {
  const { handleSubmit } = useChunkForm<FlightChunkType>(FORM_KEY, FORM_TYPE);
  const [origin, setOrigin] = useState<null | AirportLocal>(null);
  const [destination, setDestination] = useState<null | AirportLocal>(null);
  const [departureDay, setDepartureDay] = useState<number>(0);
  const [departureTime, setDepartureTime] = useState<Dayjs | null>(null);
  const [arrivalDay, setArrivalDay] = useState<number>(0);
  const [arrivalTime, setArrivalTime] = useState<Dayjs | null>(null);

  const handleFlightSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(e, {
        origin: origin!,
        destination: destination!,
        dayFields: {
          departure: {
            day: departureDay,
            time: formatDatetimeAsTimeString(departureTime),
          },
          arrival: {
            day: arrivalDay,
            time: formatDatetimeAsTimeString(arrivalTime),
          },
        },
      });

      setOrigin(null);
      setDestination(null);
      setDepartureDay(0);
      setDepartureTime(null);
      setArrivalDay(0);
      setArrivalTime(null);
    },
    [
      arrivalDay,
      arrivalTime,
      departureDay,
      departureTime,
      destination,
      handleSubmit,
      origin,
    ],
  );

  return (
    <Form onSubmit={handleFlightSubmit}>
      <AirportAutocomplete
        value={origin}
        setValue={setOrigin}
        label="Origin Airport"
        required
      />
      <AirportAutocomplete
        value={destination}
        setValue={setDestination}
        label="Destination Airport"
        required
      />
      <DayTimeInput
        timeLabel="Departure Time"
        day={departureDay}
        setDay={setDepartureDay}
        time={departureTime}
        setTime={setDepartureTime}
        dayLabel="Departure Day"
        dayRequired
        timeRequired
      />
      <DayTimeInput
        timeLabel="Arrival Time"
        day={arrivalDay}
        setDay={setArrivalDay}
        time={arrivalTime}
        setTime={setArrivalTime}
        dayLabel="Arrival Day"
        dayRequired
        timeRequired
      />
    </Form>
  );
};

export default FlightForm;
