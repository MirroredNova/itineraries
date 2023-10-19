import { Airport } from '@/constants/airports';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get('query') || '';

  const res = await fetch(
    'https://raw.githubusercontent.com/algolia/datasets/master/airports/airports.json',
  );

  const airportData: Airport[] = await res.json();
  const airportSet = new Set<string>();
  const airportLimit = 25;

  airportData.some((airport) => {
    const searchString = `${airport.iata_code} - ${airport.name} (${airport.country})`;
    if (searchString.toLowerCase().includes(query.toLowerCase())) {
      airportSet.add(searchString);
    }

    return airportSet.size >= airportLimit;
  });

  const uniqueAirportListQueried = Array.from(airportSet);
  return NextResponse.json(uniqueAirportListQueried);
}
