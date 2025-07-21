import { auth } from '@/server/utils/auth/auth';
import { Button, Stack, Typography, Box, Card } from '@mui/material';
import { Explore, Create } from '@mui/icons-material';
import Link from 'next/link';

const HomePage = async () => {
  const session = await auth();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(70vh - 64px)', // Account for navbar
        textAlign: 'center',
      }}
    >
      <Card sx={{ p: 8, maxWidth: 700, width: '100%' }}>
        <Stack spacing={6}>
          <Box>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Welcome to Itineraries
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ fontWeight: 400 }}
            >
              Create and share flexible vacation itineraries that work for any
              dates
            </Typography>
          </Box>

          {session ? (
            <Stack direction="row" spacing={4} justifyContent="center">
              <Link href="/templates" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Explore />}
                  sx={{ minWidth: 180, py: 2 }}
                >
                  Browse Templates
                </Button>
              </Link>
              <Link href="/templates" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Create />}
                  sx={{ minWidth: 180, py: 2 }}
                >
                  Create Template
                </Button>
              </Link>
            </Stack>
          ) : (
            <Stack direction="row" spacing={4} justifyContent="center">
              <Link href="/sign-in" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ minWidth: 140, py: 2 }}
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ minWidth: 140, py: 2 }}
                >
                  Sign Up
                </Button>
              </Link>
            </Stack>
          )}
        </Stack>
      </Card>
    </Box>
  );
};

export default HomePage;
