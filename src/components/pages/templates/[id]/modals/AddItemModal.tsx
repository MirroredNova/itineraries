'use client';

import React, { useState } from 'react';
import {
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Chip,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  TemplateItemType,
  CommonTagType,
  TemplateDay,
  TemplateItemTableType,
} from '@/types/schemas.types';
import BaseModal from '../components/BaseModal';
import ConfigurableItemForm, {
  serializeFieldData,
} from './forms/ConfigurableItemForm';
import IncompleteFlightsList from '../components/IncompleteFlightsList';

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    type: TemplateItemType,
    notes: string,
    subcategory?: string,
    fieldData?: Record<string, unknown>,
    tags?: string[],
    name?: string,
  ) => Promise<void>;
  days: TemplateDay[];
}

const AddItemModal = ({ open, onClose, onSubmit, days }: AddItemModalProps) => {
  const [type, setType] = useState<TemplateItemType>('activity');
  const [subcategory, setSubcategory] = useState('');
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [fieldValues, setFieldValues] = useState<Record<string, unknown>>({});
  const [tags, setTags] = useState<string[]>([]);
  const [showAutoCompleteSuggestion, setShowAutoCompleteSuggestion] =
    useState(false);
  const [incompleteFlights, setIncompleteFlights] = useState<
    Array<{
      item: TemplateItemTableType;
      day: TemplateDay;
    }>
  >([]);

  const setFieldValue = (field: string, value: unknown) => {
    setFieldValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectFlight = (selectedFlight: {
    item: TemplateItemTableType;
    day: TemplateDay;
  }) => {
    const { item } = selectedFlight;
    const fieldData = (item.fieldData as Record<string, unknown>) || {};

    // Copy relevant fields based on subcategory
    if (subcategory === 'flight_departure') {
      // Copy from arrival flight to departure flight
      setFieldValues({
        ...fieldValues,
        flightNumber: fieldData.flightNumber,
        airline: fieldData.airline,
        departureTime: fieldData.arrivalTime, // Use arrival time as departure time
        departureAirport: fieldData.arrivalAirport,
      });
    } else if (subcategory === 'flight_arrival') {
      // Copy from departure flight to arrival flight
      setFieldValues({
        ...fieldValues,
        flightNumber: fieldData.flightNumber,
        airline: fieldData.airline,
        arrivalTime: fieldData.departureTime, // Use departure time as arrival time
        arrivalAirport: fieldData.departureAirport,
      });
    }

    setShowAutoCompleteSuggestion(false);
  };

  const handleDismissSuggestion = () => {
    setShowAutoCompleteSuggestion(false);
  };

  const resetForm = () => {
    setType('activity');
    setSubcategory('');
    setName('');
    setNotes('');
    setFieldValues({});
    setTags([]);
  };

  const handleSubmit = async () => {
    const serializedFieldData =
      Object.keys(fieldValues).length > 0
        ? serializeFieldData(fieldValues)
        : undefined;

    await onSubmit(
      type,
      notes.trim(),
      subcategory || undefined,
      serializedFieldData,
      tags.length > 0 ? tags : undefined,
      name.trim() || undefined,
    );
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Common tag options
  const commonTags: CommonTagType[] = [
    'morning',
    'afternoon',
    'evening',
    'night',
    'downtown',
    'airport',
    'suburbs',
    'beach',
    'mountains',
    'city-center',
    'food',
    'culture',
    'shopping',
    'entertainment',
    'transportation',
    'accommodation',
    'wellness',
    'outdoor',
    'indoor',
    'family-friendly',
    'romantic',
    'budget',
    'luxury',
    'quick',
    'relaxing',
    'adventure',
  ];

  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      title="Add New Item"
      description="Add a new item to your itinerary"
      submitText="Add Item"
      onSubmit={handleSubmit}
      submitDisabled={false}
      maxWidth={600}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          {/* Type field */}
          <FormControl fullWidth>
            <InputLabel>Item Type</InputLabel>
            <Select
              value={type}
              label="Item Type"
              onChange={(e) => {
                const newType = e.target.value as TemplateItemType;
                setType(newType);
                // Reset subcategory when type changes
                setSubcategory('');
                setShowAutoCompleteSuggestion(false);
              }}
            >
              <MenuItem value="hotel">Hotel</MenuItem>
              <MenuItem value="restaurant">Restaurant</MenuItem>
              <MenuItem value="activity">Activity</MenuItem>
              <MenuItem value="transport">Transport</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>
            </Select>
          </FormControl>

          {/* Tags field */}
          <Autocomplete
            multiple
            options={commonTags}
            value={tags}
            onChange={(_, newValue) => setTags(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags (Optional)"
                placeholder="Add tags for organization"
                helperText="Tags help organize and filter your items"
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const tagProps = getTagProps({ index });
                const { key, ...otherProps } = tagProps;
                return (
                  <Chip
                    key={key}
                    variant="outlined"
                    label={option}
                    size="small"
                    {...otherProps}
                  />
                );
              })
            }
            freeSolo
            sx={{ width: '100%' }}
          />

          {/* Flight auto-complete suggestion */}
          {showAutoCompleteSuggestion && incompleteFlights.length > 0 && (
            <IncompleteFlightsList
              incompleteFlights={incompleteFlights}
              onSelectFlight={handleSelectFlight}
              onDismiss={handleDismissSuggestion}
              subcategory={subcategory}
            />
          )}

          {/* Configurable form fields */}
          <ConfigurableItemForm
            type={type}
            subcategory={subcategory}
            setSubcategory={(newSubcategory) => {
              setSubcategory(newSubcategory);

              // Check for incomplete flights when subcategory changes
              if (
                type === 'transport' &&
                newSubcategory?.startsWith('flight_')
              ) {
                const flights = days.flatMap((day) =>
                  day.items
                    .filter((item) => {
                      if (
                        item.type !== 'transport' ||
                        !item.subcategory?.startsWith('flight_')
                      ) {
                        return false;
                      }

                      // Check if this flight is missing the opposite subcategory
                      if (
                        newSubcategory === 'flight_departure' &&
                        item.subcategory === 'flight_arrival'
                      ) {
                        return true; // We're creating departure, this is an arrival flight
                      } else if (
                        newSubcategory === 'flight_arrival' &&
                        item.subcategory === 'flight_departure'
                      ) {
                        return true; // We're creating arrival, this is a departure flight
                      }

                      return false;
                    })
                    .map((item) => ({ item, day })),
                );

                if (flights.length > 0) {
                  setIncompleteFlights(flights);
                  setShowAutoCompleteSuggestion(true);
                } else {
                  setShowAutoCompleteSuggestion(false);
                }
              } else {
                setShowAutoCompleteSuggestion(false);
              }
            }}
            notes={notes}
            setNotes={setNotes}
            fieldValues={fieldValues}
            setFieldValue={setFieldValue}
            name={name}
            setName={setName}
          />
        </Stack>
      </LocalizationProvider>
    </BaseModal>
  );
};

export default AddItemModal;
