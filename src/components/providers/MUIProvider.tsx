'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { ReactNode } from 'react';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFB922 !important',
          color: '#333333',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#333333 !important',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF !important',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
        },
      },
    },
  },
});

type Props = {
  children: ReactNode;
};

const MUIProvider = ({ children }: Props) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default MUIProvider;
