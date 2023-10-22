import { fetchAirportDataFromCloud } from '@/services/airport.services';
import { uploadAirportData } from '@/services/prisma.services';
import { NextResponse } from 'next/server';

export async function GET() {
  const airportData = await fetchAirportDataFromCloud();
  await uploadAirportData(airportData);
  return NextResponse.json({ status: 200 });
}
