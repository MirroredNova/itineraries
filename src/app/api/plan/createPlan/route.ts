import { defaultPlan } from '@/constants/plan';
import { startingCode, incrementCode } from '@/services/plan.services';
import { createPlan, getNewestPlan } from '@/services/realtime.services';
import { NextResponse } from 'next/server';

export async function GET() {
  const newestPlan = await getNewestPlan();
  const newCode = incrementCode(newestPlan ? newestPlan.key : startingCode);
  const success = await createPlan(defaultPlan, newCode);
  return NextResponse.json(
    success ? { code: newCode } : { error: 'Failed to create new plan' },
    success ? { status: 200 } : { status: 500 },
  );
}
