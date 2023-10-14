import React from 'react';

type FlightChunkType = {
  arrivalDate: string;
  departureDate: string;
  destination: string;
  origin: string;
};

const FlightChunk = ({ chunkData }: { chunkData: FlightChunkType }) => (
  <div>
    <h1>Flight</h1>
    <p>Origin: {chunkData.origin}</p>
    <p>Destination: {chunkData.destination}</p>
    <p>Departure Date: {chunkData.departureDate}</p>
    <p>Arrival Date: {chunkData.arrivalDate}</p>
  </div>
);

export default FlightChunk;
