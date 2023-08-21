/* eslint-disable import/prefer-default-export */
import { Plan } from '@/constants/plan';
import app from '@/modules/firebase';
import { getDatabase, ref, set } from 'firebase/database';

const sendPlan = (planData: Plan) => {
  const db = getDatabase(app);
  set(ref(db, `plans/${planData.uniqueCode}`), planData);
};

export { sendPlan };
