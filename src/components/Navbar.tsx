import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import React from 'react';

const Navbar = () => {
  return (
    <Container
      component="nav"
      className="h-16 fixed top-0 left-0 w-full bg-white"
    >
      <Stack
        className="h-full"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <div>
          <h1 className="text-lg">Itineraries</h1>
        </div>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary">
            Log in
          </Button>
          <Button variant="outlined" color="primary">
            Sign up
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Navbar;
