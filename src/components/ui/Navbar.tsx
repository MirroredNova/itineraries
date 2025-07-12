import { signOutAction } from '@/server/actions/auth.actions';
import { auth } from '@/server/utils/auth/auth';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import React from 'react';

const Navbar = async () => {
  const session = await auth();
  return (
    <Container
      component="nav"
      className="h-16 fixed top-0 left-0 min-w-full bg-white"
    >
      <Stack
        className="h-full"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Link href="/" className="flex items-center">
          <Typography variant="h5">Itineraries</Typography>
        </Link>
        <Stack direction="row" spacing={2} alignItems="center">
          <Link href="/templates">
            <Typography variant="body1" color="primary">
              Templates
            </Typography>
          </Link>
          <Link href="/itineraries">
            <Typography variant="body1" color="primary">
              Itineraries
            </Typography>
          </Link>
        </Stack>
        <Stack direction="row" spacing={2}>
          {session ? (
            <form action={signOutAction}>
              <Button variant="outlined" color="primary" type="submit">
                Sign out
              </Button>
            </form>
          ) : (
            <>
              <Link href="/sign-in">
                <Button type="submit" variant="contained" color="primary">
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="outlined" color="primary">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Navbar;
