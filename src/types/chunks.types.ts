import { AirportLocal } from './airport.types';

export type ChunkMapType = (props: { chunkData: object }) => React.JSX.Element;

export type HotelChunkType = {
  checkInTime: string;
  checkOutTime: string;
  hotelName: string;
};

export type FlightChunkType = {
  arrivalTime: string;
  departureTime: string;
  destination: AirportLocal;
  origin: AirportLocal;
};
