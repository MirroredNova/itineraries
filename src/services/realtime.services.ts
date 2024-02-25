import app from '@/initializations/firebase';
import { Plan } from '@/types/plan.types';
import {
  child,
  get,
  getDatabase,
  limitToLast,
  query,
  ref,
  set,
} from 'firebase/database';

const db = getDatabase(app);

export const getNewestPlan = async () => {
  const planRef = ref(db, 'plans');
  const latestPostRef = query(planRef, limitToLast(1));
  const newestPlan = (await get(latestPostRef)).val();
  if (!newestPlan) return null;
  const key = Object.keys(newestPlan)[0];
  return { key, plan: newestPlan[key] as Plan };
};

export const createPlan = async (planData: Plan, uniqueCode: string) => {
  const planRef = ref(db, 'plans');
  const newChildRef = child(planRef, uniqueCode);
  const snapshot = await get(newChildRef);
  if (!snapshot.exists()) {
    await set(newChildRef, planData);
    return true;
  }
  return false;
};

export const updatePlan = async (planId: string, planData: Plan) => {
  const planRef = ref(db, `plans/${planId}`);
  await set(planRef, planData);
  return true;
};

export const getPlan = async (planId: string) => {
  const planRef = ref(db, `plans/${planId}`);
  return (await get(planRef)).val() as Plan;
};

export const deleteConfig = async (planId: string, key: string) => {
  const planRef = ref(db, `plans/${planId}`);
  const planSnapshot = await get(planRef);
  const plan = planSnapshot.val() as Plan;
  if (!plan) return;

  const updatedConfigs =
    plan.configs?.filter((config) => config.type !== key) ?? [];

  await set(planRef, { ...plan, configs: updatedConfigs });
};

export const updateDays = async (planId: string, dayIndex?: number) => {
  const planRef = ref(db, `plans/${planId}`);
  const planSnapshot = await get(planRef);
  const plan = planSnapshot.val() as Plan;
  if (!plan) return;

  const updatedDays = [...(plan.days ?? [])];

  if (dayIndex !== undefined) {
    updatedDays.splice(dayIndex, 1);
  } else {
    updatedDays.push({
      dayNum: updatedDays.length,
      chunks: [],
    });
  }

  await set(planRef, { ...plan, days: updatedDays });
};

/**
 * Makes sure that, give a number, there are total number of days is that number.
 * Ex. if there are currently 4 days in the plan, and the number passed to this function is 7, then 3 days will be added to the plan.
 */
export const addDaysUpto = async (planId: string, numDays: number) => {
  const planRef = ref(db, `plans/${planId}`);
  const planSnapshot = await get(planRef);
  const plan = planSnapshot.val() as Plan;
  if (!plan) return;

  const updatedDays = [...(plan.days ?? [])];

  for (let i = 0; i < numDays; i += 1) {
    updatedDays.push({
      dayNum: updatedDays.length,
      chunks: [],
    });
  }

  await set(planRef, { ...plan, days: updatedDays });
};

export const dayExists = async (planId: string, dayNum: number) => {
  const planRef = ref(db, `plans/${planId}`);
  const planSnapshot = await get(planRef);
  const plan = planSnapshot.val() as Plan;
  if (!plan) return false;

  const day = plan.days?.find((d) => d.dayNum === dayNum);
  return !!day;
};
