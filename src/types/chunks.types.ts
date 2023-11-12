import { AirportLocal } from './airport.types';

export type ChunkMapType = (props: { chunkData: object }) => React.JSX.Element;

type DayField = {
  day?: number;
  time: string;
};

type DayFields = {
  [key: string]: DayField;
};

export type HotelChunkType = {
  hotelName: string;
  dayFields: DayFields;
};

export type FlightChunkType = {
  destination: AirportLocal;
  origin: AirportLocal;
  dayFields: DayFields;
};
