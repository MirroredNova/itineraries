import { signOutAction } from '@/server/actions/auth.actions';
import { auth } from '@/server/utils/auth/auth';
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';

const Navbar = async () => {
  const session = await auth();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        zIndex: 1201,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ minHeight: 64 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h5"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                '&:hover': {
                  color: 'primary.dark',
                },
              }}
            >
              Itineraries
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={3} alignItems="center">
            <Link href="/templates" style={{ textDecoration: 'none' }}>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                Templates
              </Typography>
            </Link>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ ml: 3 }}>
            {session ? (
              <form action={signOutAction}>
                <Button variant="outlined" color="primary" type="submit">
                  Sign out
                </Button>
              </form>
            ) : (
              <>
                <Link href="/sign-in" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary">
                    Sign in
                  </Button>
                </Link>
                <Link href="/sign-up" style={{ textDecoration: 'none' }}>
                  <Button variant="outlined" color="primary">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
