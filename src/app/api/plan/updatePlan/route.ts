import { updatePlan } from '@/services/realtime.services';
import { Plan } from '@/types/plan.types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const planCode = searchParams.get('planCode');
  if (!planCode)
    return NextResponse.json(
      { error: 'no planCode provided' },
      { status: 400 },
    );
  const body = (await req.json()) as Plan;
  await updatePlan(planCode, body);
  return NextResponse.json({ status: 200 });
}

// should return the new plan object instead of doing refresh on client
// updatePlan endpoint should be called and then return the new plan object
