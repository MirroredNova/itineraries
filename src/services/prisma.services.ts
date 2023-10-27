/* eslint-disable no-underscore-dangle */
import { AirportCloud } from '@/constants/airports';
import { prisma } from '@/initializations/prisma';

export const uploadAirportData = async (data: AirportCloud[]) => {
  for (let i = 0; i < data.length; i += 1) {
    const airport = data[i];
    // eslint-disable-next-line no-await-in-loop
    await prisma.airport.upsert({
      where: {
        iata: airport.iata_code,
      },
      update: {
        name: airport.name,
        city: airport.city,
        country: airport.country,
        lat: airport._geoloc.lat,
        long: airport._geoloc.lng,
        links: airport.links_count,
        searchString: `${airport.iata_code} - ${airport.name} (${airport.country})`,
      },
      create: {
        name: airport.name,
        city: airport.city,
        country: airport.country,
        iata: airport.iata_code,
        lat: airport._geoloc.lat,
        long: airport._geoloc.lng,
        links: airport.links_count,
        searchString: `${airport.iata_code} - ${airport.name} (${airport.country})`,
      },
    });
  }
};

export const fetchAirportData = async (queryString: string) => {
  const airportData = await prisma.airport.findMany({
    where: {
      searchString: {
        contains: queryString,
        mode: 'insensitive',
      },
    },
    take: 10,
    orderBy: {
      links: 'desc',
    },
  });
  return airportData;
};
