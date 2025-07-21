'use client';

import React from 'react';
import { Alert, Button, Stack, Typography, Chip } from '@mui/material';
import { FlightTakeoff, FlightLand } from '@mui/icons-material';
import { TemplateItemTableType, TemplateDay } from '@/types/schemas.types';

interface FlightAutoCompleteSuggestionProps {
  matchingFlight: {
    item: TemplateItemTableType;
    day: TemplateDay;
  };
  onAutoComplete: () => void;
  onDismiss: () => void;
}

const FlightAutoCompleteSuggestion = ({
  matchingFlight,
  onAutoComplete,
  onDismiss,
}: FlightAutoCompleteSuggestionProps) => {
  const { item, day } = matchingFlight;
  const fieldData = (item.fieldData as Record<string, unknown>) || {};

  const isDeparture = item.subcategory === 'flight_departure';
  const Icon = isDeparture ? FlightTakeoff : FlightLand;
  const action = isDeparture ? 'departure' : 'arrival';

  return (
    <Alert
      severity="info"
      icon={<Icon />}
      action={
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            color="primary"
            onClick={onAutoComplete}
            sx={{ minWidth: 'auto' }}
          >
            Auto-fill
          </Button>
          <Button
            size="small"
            color="inherit"
            onClick={onDismiss}
            sx={{ minWidth: 'auto' }}
          >
            Dismiss
          </Button>
        </Stack>
      }
    >
      <Stack spacing={1}>
        <Typography variant="body2">
          Found matching {action} flight for{' '}
          <Chip
            label={`#${fieldData.flightNumber || 'Flight'}`}
            size="small"
            variant="outlined"
          />{' '}
          on Day {day.dayNumber}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Click &ldquo;Auto-fill&rdquo; to copy flight details and complete the
          pair
        </Typography>
      </Stack>
    </Alert>
  );
};

export default FlightAutoCompleteSuggestion;
