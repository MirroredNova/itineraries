/* eslint-disable import/prefer-default-export */
import { Plan } from '@/constants/plan';
import app from '@/modules/firebase';
import {
  equalTo,
  get,
  getDatabase,
  goOffline,
  limitToLast,
  orderByChild,
  push,
  query,
  ref,
  set,
} from 'firebase/database';

export const sendPlan = (planData: Plan) => {
  const db = getDatabase(app);
  const planRef = ref(db, 'plans');
  const newPlanRef = push(planRef, planData);
  if (!newPlanRef.key) throw new Error('Error while sending plan');
  set(newPlanRef, planData);
  goOffline(db);
  return newPlanRef.key;
};

export const getPlan = async (planId: string) => {
  const db = getDatabase(app);
  const planRef = ref(db, `plans/${planId}`);
  goOffline(db);
  return (await get(planRef)).val() as Plan;
};

export const getPlanByCode = async (uniqueCode: string) => {
  const db = getDatabase(app);
  const planRef = ref(db, 'plans');
  const planQuery = query(
    planRef,
    orderByChild('uniqueCode'),
    equalTo(uniqueCode),
    limitToLast(1),
  );
  const plan = (await get(planQuery)).val();
  if (!plan) return null;
  goOffline(db);
  return Object.keys(plan)[0] as string;
};

export const getNewestPlan = async () => {
  const db = getDatabase(app);
  const planRef = ref(db, 'plans');
  const latestPostRef = query(planRef, limitToLast(1));
  const newestPlan = (await get(latestPostRef)).val();
  if (!newestPlan) return null;
  goOffline(db);
  return newestPlan[Object.keys(newestPlan)[0]] as Plan;
};
