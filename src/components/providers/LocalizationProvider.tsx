'use client';

import React, { ReactNode } from 'react';
import { LocalizationProvider as LocalizationProviderX } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type Props = {
  children: ReactNode;
};

const LocalizationProvider = ({ children }: Props) => (
  <LocalizationProviderX dateAdapter={AdapterDayjs}>
    {children}
  </LocalizationProviderX>
);

export default LocalizationProvider;
