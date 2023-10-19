'use client';

import React from 'react';
import { LocalizationProvider as LocalizationProviderX } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type Props = {
  children: React.ReactNode;
};

const LocalizationProvider = ({ children }: Props) => (
  <LocalizationProviderX dateAdapter={AdapterDayjs}>
    {children}
  </LocalizationProviderX>
);

export default LocalizationProvider;
