export type AirportCloud = {
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

export type AirportLocal = {
  iata: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  long: number;
  links: number;
  searchString: string;
  createdAt: Date;
};
