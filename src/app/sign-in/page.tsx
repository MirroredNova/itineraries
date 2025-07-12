import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import React from 'react';
import { signIn } from '@/server/utils/auth/auth';

const page = () => {
  const handleSubmit = async (formData: FormData) => {
    'use server';
    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      callbackUrl: '/',
    });
    console.log(result);
  };

  return (
    <Card sx={{ mt: 16, maxWidth: 450, mx: 'auto', p: 3 }}>
      <Typography variant="h5">Sign in</Typography>
      <Typography variant="subtitle1" gutterBottom>
        Or <Link href="/sign-up">create</Link> an account
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        To see your saved itineraries
      </Typography>
      <Stack spacing={2}>
        <form action={handleSubmit}>
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
            <FormControlLabel
              control={<Checkbox />}
              label="Remember me"
              sx={{ height: 20 }}
            />
            <Button variant="contained" color="primary" fullWidth type="submit">
              Sign in
            </Button>
          </Stack>
        </form>
        <Stack spacing={2}>
          <Typography align="center" variant="body2">
            - or -
          </Typography>
          <form
            action={async () => {
              'use server';
              await signIn('google');
            }}
          >
            <Button variant="outlined" color="primary" fullWidth type="submit">
              <GoogleIcon sx={{ mr: 1 }} />
              Sign in with Google
            </Button>
          </form>
        </Stack>
      </Stack>
    </Card>
  );
};

export default page;
