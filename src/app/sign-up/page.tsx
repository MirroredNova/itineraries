import { signIn } from '@/server/utils/auth/auth';
import { createClient } from '@/server/utils/auth/supabase-auth';
import {
  Button,
  Card,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

const page = async () => {
  const createUser = async (formData: FormData) => {
    'use server';
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    // Validate that both fields exist and are non-empty strings
    if (
      !email ||
      !password ||
      typeof email !== 'string' ||
      typeof password !== 'string'
    ) {
      console.error(
        'Invalid form data: email and password must be non-empty strings',
      );
      return;
    }

    const supabase = await createClient();

    // First sign up the user
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      console.error('Error signing up:', signUpError.message);
      return;
    }

    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      callbackUrl: '/',
    });

    console.log(result);
  };

  return (
    <Card sx={{ mt: 16, maxWidth: 450, mx: 'auto', p: 3 }}>
      <Typography variant="h5">Sign up</Typography>
      <Typography variant="subtitle1" gutterBottom>
        Or <Link href="/sign-up">sign in</Link> to an existing account
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        To see your saved itineraries
      </Typography>
      <Stack spacing={2}>
        <form action={createUser}>
          <Stack spacing={3}>
            <TextField
              label="Email"
              type="email"
              name="email"
              variant="outlined"
              size="small"
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              variant="outlined"
              size="small"
              fullWidth
              required
            />
            <Button variant="contained" color="primary" fullWidth type="submit">
              Sign up
            </Button>
          </Stack>
        </form>
      </Stack>
    </Card>
  );
};

export default page;
