'use client';

import React, { useState, useEffect } from 'react';
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
import dayjs from 'dayjs';
import {
  TemplateItemType,
  TemplateItemTableType,
  CommonTagType,
} from '@/types/schemas.types';
import BaseModal from '../components/BaseModal';
import ConfigurableItemForm, {
  serializeFieldData,
} from './forms/ConfigurableItemForm';

interface EditItemModalProps {
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
  item: TemplateItemTableType | null;
}

const EditItemModal = ({
  open,
  onClose,
  onSubmit,
  item,
}: EditItemModalProps) => {
  const [type, setType] = useState<TemplateItemType>('activity');
  const [subcategory, setSubcategory] = useState('');
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [fieldValues, setFieldValues] = useState<Record<string, unknown>>({});
  const [tags, setTags] = useState<string[]>([]);

  const setFieldValue = (field: string, value: unknown) => {
    setFieldValues((prev) => ({ ...prev, [field]: value }));
  };

  // Initialize form when item changes
  useEffect(() => {
    if (item) {
      setType(item.type as TemplateItemType);
      setSubcategory(item.subcategory || '');
      setName(item.name || '');
      setNotes(item.notes || '');

      // Convert time strings back to Dayjs objects
      const fieldData = (item.fieldData as Record<string, unknown>) || {};
      const convertedFieldData = Object.fromEntries(
        Object.entries(fieldData).map(([key, value]) => [
          key,
          typeof value === 'string' && value.match(/^\d{2}:\d{2}$/)
            ? dayjs(`2000-01-01T${value}`)
            : value,
        ]),
      );

      setFieldValues(convertedFieldData);
      setTags((item.tags as string[]) || []);
    }
  }, [item]);

  const handleSubmit = async () => {
    if (!item) return;

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
  };

  const handleClose = () => {
    onClose();
  };

  const handleTypeChange = (newType: TemplateItemType) => {
    setType(newType);
    setSubcategory(''); // Reset subcategory when type changes
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
      title="Edit Item"
      description="Update the item details"
      submitText="Update Item"
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
              onChange={(e) =>
                handleTypeChange(e.target.value as TemplateItemType)
              }
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

          {/* Configurable form fields */}
          <ConfigurableItemForm
            type={type}
            subcategory={subcategory}
            setSubcategory={setSubcategory}
            name={name}
            setName={setName}
            notes={notes}
            setNotes={setNotes}
            fieldValues={fieldValues}
            setFieldValue={setFieldValue}
          />
        </Stack>
      </LocalizationProvider>
    </BaseModal>
  );
};

export default EditItemModal;
