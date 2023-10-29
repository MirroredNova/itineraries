'use client';

import { themeMui } from '@/constants/theme';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { ReactNode } from 'react';

const theme = createTheme(themeMui);

type Props = {
  children: ReactNode;
};

const MUIProvider = ({ children }: Props) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default MUIProvider;
