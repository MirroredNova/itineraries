import React from 'react';
import Chunk from '@/components/shared/Chunk';
import { FlightChunkType } from '@/types/chunks.types';

type Props = {
  chunkData: FlightChunkType;
};

const FlightChunk = ({ chunkData }: Props) => (
  <Chunk
    summaryText={`Flight: ${chunkData.origin.iata} \u27F6 ${chunkData.destination.iata}`}
  >
    <p>Origin: {chunkData.origin.searchString}</p>
    <p>Destination: {chunkData.destination.searchString}</p>
    <p>Departure Date: {chunkData.departureDate}</p>
    <p>Arrival Date: {chunkData.arrivalDate}</p>
  </Chunk>
);

export default FlightChunk;
