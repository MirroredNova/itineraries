import { getPlan } from '@/services/realtime.services';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const planCode = searchParams.get('planCode');
  if (!planCode) {
    return NextResponse.json(
      { error: 'No plan code provided' },
      { status: 400 },
    );
  }
  const plan = await getPlan(planCode);
  return NextResponse.json(plan, { status: 200 });
}
