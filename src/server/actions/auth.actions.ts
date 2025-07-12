'use server';

import { signOut } from '@/server/utils/auth/auth';

export const signOutAction = async () => {
  await signOut();
};
