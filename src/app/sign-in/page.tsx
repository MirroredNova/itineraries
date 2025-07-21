import { signIn } from '@/server/utils/auth/auth';
import { auth } from '@/server/utils/auth/auth';
import { redirect } from 'next/navigation';
import AuthForm from '@/components/shared/AuthForm';

const page = async () => {
  const session = await auth();

  // Redirect authenticated users to home page
  if (session) {
    redirect('/');
  }

  const handleSubmit = async (formData: FormData) => {
    'use server';
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      callbackUrl: '/',
    });
  };

  return <AuthForm mode="signin" onSubmit={handleSubmit} />;
};

export default page;
