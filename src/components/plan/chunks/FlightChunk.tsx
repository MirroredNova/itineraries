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
    <p>Departure Time: {chunkData.dayFields[0].time}</p>
    <p>Arrival Time: {chunkData.dayFields[1].time}</p>
  </Chunk>
);

export default FlightChunk;
