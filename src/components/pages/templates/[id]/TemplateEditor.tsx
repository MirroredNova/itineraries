'use client';

import { updateTemplateAction } from '@/server/actions/template.actions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { TemplateTableType } from '@/types/schemas.types';
import DayList from './DayList';

interface Props {
  initialTemplate: TemplateTableType;
}

const TemplateEditor = ({ initialTemplate }: Props) => {
  const [template, setTemplate] = useState(initialTemplate);

  const handleChange = (
    field: keyof TemplateTableType,
    value: string | number,
  ) => {
    setTemplate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box component="form" action={updateTemplateAction}>
      <Typography variant="h4" gutterBottom>
        Template {template.id}
      </Typography>

      <Stack spacing={3} sx={{ mt: 3 }}>
        <TextField
          label="Name"
          value={template.name}
          onChange={(e) => handleChange('name', e.target.value)}
          fullWidth
        />

        <TextField
          label="Number of Days"
          type="number"
          value={template.numDays}
          onChange={(e) =>
            handleChange('numDays', parseInt(e.target.value, 10))
          }
          fullWidth
        />

        <Typography variant="body2" color="text.secondary">
          Created: {new Date(template.createdAt).toLocaleDateString()}
        </Typography>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Stack>
      <DayList initialTemplate={template} />
    </Box>
  );
};

export default TemplateEditor;
