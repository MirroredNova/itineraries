import { AirportLocal } from './airport.types';

export type ChunkMapType = (props: { chunkData: object }) => React.JSX.Element;

export type HotelChunkType = {
  checkInDate: string;
  checkOutDate: string;
  hotelName: string;
};

export type FlightChunkType = {
  arrivalDate: string;
  departureDate: string;
  destination: AirportLocal;
  origin: AirportLocal;
};
