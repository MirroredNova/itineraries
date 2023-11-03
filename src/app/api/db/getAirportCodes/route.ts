import { fetchAirportData } from '@/services/prisma.services';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get('query') || '';
  const airportData = await fetchAirportData(query);
  return NextResponse.json(airportData);
}
