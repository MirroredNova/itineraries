import { Airport } from '@/constants/airports';

export const fetchAirportDataFromCloud = async () => {
  const res = await fetch(
    'https://raw.githubusercontent.com/algolia/datasets/master/airports/airports.json',
  );

  const airportData: Airport[] = await res.json();
  return airportData;
};
