import Chunk from '@/components/shared/Chunk';
import { AirportLocal } from '@/constants/airports';
import React from 'react';

type FlightChunkType = {
  arrivalDate: string;
  departureDate: string;
  destination: AirportLocal | string;
  origin: AirportLocal | string;
};

const FlightChunk = ({ chunkData }: { chunkData: FlightChunkType }) => {
  const renderAirportInfo = (
    label: string,
    airport: AirportLocal | string | null,
  ) =>
    airport ? (
      <p>
        {label}: {typeof airport === 'string' ? airport : airport.searchString}
      </p>
    ) : null;

  return (
    <Chunk summaryText="Flight">
      {renderAirportInfo('Origin', chunkData.origin)}
      {renderAirportInfo('Destination', chunkData.destination)}
      <p>Departure Date: {chunkData.departureDate}</p>
      <p>Arrival Date: {chunkData.arrivalDate}</p>
    </Chunk>
  );
};

export default FlightChunk;
