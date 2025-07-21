import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from '@/server/utils/auth/auth';

interface AuthFormProps {
  mode: 'signin' | 'signup';
  onSubmit: (formData: FormData) => Promise<void>;
}

const AuthForm = ({ mode, onSubmit }: AuthFormProps) => {
  const isSignIn = mode === 'signin';
  const title = isSignIn ? 'Sign in' : 'Sign up';
  const submitText = isSignIn ? 'Sign in' : 'Sign up';
  const alternateLink = isSignIn ? '/sign-up' : '/sign-in';
  const alternateText = isSignIn ? 'create' : 'sign in';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px)', // Account for navbar
      }}
    >
      <Card
        sx={{
          maxWidth: 450,
          width: '100%',
          p: 4,
          boxShadow: 4,
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Or{' '}
              <Link href={alternateLink} color="primary">
                {alternateText}
              </Link>{' '}
              an account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              To see your saved itineraries
            </Typography>
          </Box>

          <form action={onSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Email"
                type="email"
                name="email"
                variant="outlined"
                required
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                required
              />
              {isSignIn && (
                <FormControlLabel
                  control={<Checkbox />}
                  label="Remember me"
                  sx={{ alignSelf: 'flex-start' }}
                />
              )}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
              >
                {submitText}
              </Button>
            </Stack>
          </form>

          <Box>
            <Typography
              align="center"
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              - or -
            </Typography>
            <form
              action={async () => {
                'use server';
                await signIn('google', { callbackUrl: '/' });
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                size="large"
                startIcon={<GoogleIcon />}
                fullWidth
              >
                {submitText} with Google
              </Button>
            </form>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};

export default AuthForm;
