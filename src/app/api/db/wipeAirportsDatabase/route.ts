import { prisma } from '@/initializations/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  await prisma.airport.deleteMany({});
  return NextResponse.json({ status: 200 });
}
