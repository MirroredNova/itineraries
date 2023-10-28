import CreationButton from '@/components/home/CreationButton';
import Description from '@/components/home/Description';
import ExistingButton from '@/components/home/ExistingButton';
import { Divider, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import React from 'react';

const page = () => (
  <div className="grid gap-1 grid-cols-2 max-w-2xl">
    <Card className="p-12 col-span-full flex flex-col gap-4 text-secondary-dark">
      <Description />
      <Divider />
      <div className="w-full flex flex-col items-center">
        <Stack spacing={2} className="w-full max-w-xs">
          <CreationButton />
          <Divider />
          <ExistingButton />
        </Stack>
      </div>
    </Card>
  </div>
);

export default page;
