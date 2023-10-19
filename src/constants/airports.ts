// export type Airports = {
//   name: string;
//   iata_code: string;
//   icao_code: string;
//   lat: number;
//   lng: number;
//   country_code: string;
// };

// export type AirportReduced = {
//   name: string;
//   iata_code: string;
//   country_code: string;
//   searchString: string;
// };

export type Airport = {
  name: string;
  city: string;
  country: string;
  iata_code: string;
  _geoloc: {
    lat: number;
    lng: number;
  };
  links_count: number;
  objectID: string;
  searchString?: string;
};
