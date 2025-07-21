'use client';

import React from 'react';
import { Card, Typography, Button, Stack } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface EmptyStateProps {
  onAddDay: () => void;
}

const EmptyState = ({ onAddDay }: EmptyStateProps) => {
  return (
    <Card
      sx={{
        p: 6,
        textAlign: 'center',
        border: '2px dashed',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Stack spacing={3} alignItems="center">
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ fontWeight: 600 }}
        >
          No Days Yet
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 400 }}
        >
          Start building your itinerary by adding your first day. You can then
          add items like hotels, restaurants, activities, and transportation.
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={onAddDay}
          sx={{ px: 4, py: 1.5 }}
        >
          Add Your First Day
        </Button>
      </Stack>
    </Card>
  );
};

export default EmptyState;
