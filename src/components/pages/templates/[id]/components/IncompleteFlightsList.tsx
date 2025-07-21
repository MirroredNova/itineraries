'use client';

import React from 'react';
import {
  Alert,
  Button,
  Stack,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import { FlightTakeoff, FlightLand } from '@mui/icons-material';
import { TemplateItemTableType, TemplateDay } from '@/types/schemas.types';

interface IncompleteFlightsListProps {
  incompleteFlights: Array<{
    item: TemplateItemTableType;
    day: TemplateDay;
  }>;
  onSelectFlight: (flight: {
    item: TemplateItemTableType;
    day: TemplateDay;
  }) => void;
  onDismiss: () => void;
  subcategory: string;
}

const IncompleteFlightsList = ({
  incompleteFlights,
  onSelectFlight,
  onDismiss,
  subcategory,
}: IncompleteFlightsListProps) => {
  const isDeparture = subcategory === 'flight_departure';
  const Icon = isDeparture ? FlightTakeoff : FlightLand;
  const action = isDeparture ? 'departure' : 'arrival';

  return (
    <Alert
      severity="info"
      icon={<Icon />}
      action={
        <Button
          size="small"
          color="inherit"
          onClick={onDismiss}
          sx={{ minWidth: 'auto' }}
        >
          Dismiss
        </Button>
      }
    >
      <Stack spacing={2}>
        <Typography variant="body2">
          Found {incompleteFlights.length} incomplete flight
          {incompleteFlights.length > 1 ? 's' : ''} that need a {action} leg:
        </Typography>

        <List dense sx={{ p: 0, bgcolor: 'background.paper', borderRadius: 1 }}>
          {incompleteFlights.map(({ item, day }, index) => {
            const fieldData = (item.fieldData as Record<string, unknown>) || {};
            const flightNumber = fieldData.flightNumber as string;
            const airline = fieldData.airline as string;

            return (
              <ListItem key={index} disablePadding sx={{ marginBottom: 0 }}>
                <ListItemButton
                  onClick={() => onSelectFlight({ item, day })}
                  sx={{ borderRadius: 1 }}
                >
                  <ListItemText
                    primary={
                      <Stack direction="row" spacing={1} alignItems="center">
                        {flightNumber ? (
                          <Chip
                            label={`#${flightNumber}`}
                            size="small"
                            variant="outlined"
                          />
                        ) : (
                          <Chip
                            label={`Flight ${item.subcategory === 'flight_departure' ? 'Departure' : 'Arrival'}`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                        {airline && (
                          <Typography variant="body2" color="text.secondary">
                            {airline}
                          </Typography>
                        )}
                      </Stack>
                    }
                    secondary={`Day ${day.dayNumber}`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Typography variant="caption" color="text.secondary">
          Click on a flight to auto-fill the form with its details
        </Typography>
      </Stack>
    </Alert>
  );
};

export default IncompleteFlightsList;
