import React from 'react';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';

const Navbar = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters variant="dense">
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              fontWeight: 700,
              letterSpacing: '.2rem',
            }}
          >
            ITINERARIES
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
            }}
          >
            This site is a work in progress and not mobile friendly yet.
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  </Box>
);

export default Navbar;
