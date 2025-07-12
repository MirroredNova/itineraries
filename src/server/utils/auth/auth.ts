import NextAuth from 'next-auth';
import { createClient } from '@/server/utils/auth/supabase-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const supabase = await createClient();

        const {
          data: { user },
          error,
        } = await supabase.auth.signInWithPassword({
          email: credentials?.email as string,
          password: credentials?.password as string,
        });

        if (error || !user) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.email,
        };
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
});
