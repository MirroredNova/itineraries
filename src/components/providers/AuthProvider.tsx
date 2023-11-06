'use client';

import React, { createContext, useEffect, useState } from 'react';
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import app from '@/initializations/firebase';
import { AuthContextType } from '@/types/auth.types';

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
});

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (val) => {
      setUser(val);
      if (!val) {
        signInAnonymously(auth).catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
