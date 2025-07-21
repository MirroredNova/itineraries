import { signIn } from '@/server/utils/auth/auth';
import { auth } from '@/server/utils/auth/auth';
import { createClient } from '@/server/utils/auth/supabase-auth';
import { redirect } from 'next/navigation';
import AuthForm from '@/components/shared/AuthForm';

const page = async () => {
  const session = await auth();

  // Redirect authenticated users to home page
  if (session) {
    redirect('/');
  }

  const createUser = async (formData: FormData) => {
    'use server';
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const supabase = await createClient();

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      throw new Error(signUpError.message);
    }

    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
    });
  };

  return <AuthForm mode="signup" onSubmit={createUser} />;
};

export default page;
