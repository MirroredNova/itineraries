import Chunk from '@/components/shared/Chunk';
import React from 'react';

type FlightChunkType = {
  arrivalDate: string;
  departureDate: string;
  destination: string;
  origin: string;
};

const FlightChunk = ({ chunkData }: { chunkData: FlightChunkType }) => (
  <Chunk summaryText="Flight">
    <p>Origin: {chunkData.origin}</p>
    <p>Destination: {chunkData.destination}</p>
    <p>Departure Date: {chunkData.departureDate}</p>
    <p>Arrival Date: {chunkData.arrivalDate}</p>
  </Chunk>
);

export default FlightChunk;
