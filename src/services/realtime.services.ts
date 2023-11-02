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

export const getNewestPlan = async () => {
  const planRef = ref(db, 'plans');
  const latestPostRef = query(planRef, limitToLast(1));
  const newestPlan = (await get(latestPostRef)).val();
  if (!newestPlan) return null;
  const key = Object.keys(newestPlan)[0];
  return { key, plan: newestPlan[key] as Plan };
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

export const updateConfig = async (
  planId: string,
  key: string,
  data: string,
) => {
  const planRef = ref(db, `plans/${planId}`);
  const planSnapshot = await get(planRef);
  const plan = planSnapshot.val() as Plan;
  if (!plan) return;

  let updatedConfigs = plan.configs?.map((config) =>
    config.type === key ? { ...config, data } : config,
  );

  if (!updatedConfigs) {
    updatedConfigs = [{ type: key, data }];
  } else if (!updatedConfigs.some((config) => config.type === key)) {
    updatedConfigs.push({ type: key, data });
  }

  await set(planRef, { ...plan, configs: updatedConfigs });
};
