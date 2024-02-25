import { AirportLocal } from './airport.types';

export type ChunkMapType = (props: { chunkData: object }) => React.JSX.Element;

export type DayField = {
  label: string;
  day: number;
  time: string;
};

export type HotelChunkType = {
  hotelName: string;
  dayFields: DayField[];
};

export type FlightChunkType = {
  destination: AirportLocal;
  origin: AirportLocal;
  dayFields: DayField[];
};
