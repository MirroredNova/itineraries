import React from 'react';
import Stack from '@mui/material/Stack';
import TemplatesList from '@/components/pages/templates/TemplatesList';

const TemplatePage = () => {
  return (
    <Stack spacing={2} direction="row">
      <TemplatesList />
    </Stack>
  );
};

export default TemplatePage;
