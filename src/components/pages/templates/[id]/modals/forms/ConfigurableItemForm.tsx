'use client';

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Typography,
  Box,
  Autocomplete,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

import { itemFormConfigs, FormField, FieldGroup } from './ItemFormConfig';
import { TemplateItemType } from '@/types/schemas.types';

// Utility function to serialize field data for server actions
export const serializeFieldData = (fieldValues: Record<string, unknown>) => {
  return Object.fromEntries(
    Object.entries(fieldValues).map(([key, value]) => [
      key,
      value && typeof value === 'object' && 'format' in value
        ? (value as { format: (format: string) => string }).format('HH:mm')
        : value,
    ]),
  );
};

interface ConfigurableItemFormProps {
  type: TemplateItemType;
  subcategory: string;
  setSubcategory: (subcategory: string) => void;
  name: string;
  setName: (name: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  fieldValues: Record<string, unknown>;
  setFieldValue: (field: string, value: unknown) => void;
}

const ConfigurableItemForm = ({
  type,
  subcategory,
  setSubcategory,
  name,
  setName,
  notes,
  setNotes,
  fieldValues,
  setFieldValue,
}: ConfigurableItemFormProps) => {
  const config = itemFormConfigs[type];

  const renderField = (field: FormField) => {
    // Check if field should be visible based on condition
    if (field.condition && !field.condition(subcategory, fieldValues)) {
      return null;
    }

    const value = fieldValues[field.key] || '';

    switch (field.type) {
      case 'text':
        return (
          <TextField
            key={field.key}
            label={field.label}
            value={value as string}
            onChange={(e) => setFieldValue(field.key, e.target.value)}
            placeholder={field.placeholder}
            multiline={field.multiline}
            rows={field.rows}
            required={field.required}
            sx={field.sx}
            fullWidth
          />
        );

      case 'select':
        return (
          <FormControl key={field.key} fullWidth sx={field.sx}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={value as string}
              label={field.label}
              onChange={(e) => setFieldValue(field.key, e.target.value)}
              required={field.required}
            >
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'time':
        // Ensure we have a proper Dayjs object or null
        const timeValue =
          value && typeof value === 'object' && 'format' in value
            ? (value as Dayjs)
            : null;

        return (
          <Box key={field.key} sx={field.sx}>
            <Typography variant="subtitle2" gutterBottom>
              {field.label}
            </Typography>
            <TimePicker
              value={timeValue}
              onChange={(newValue) => setFieldValue(field.key, newValue)}
              slotProps={{
                textField: {
                  placeholder: field.placeholder,
                  fullWidth: true,
                  required: field.required,
                },
              }}
            />
          </Box>
        );

      case 'textarea':
        return (
          <TextField
            key={field.key}
            label={field.label}
            value={value as string}
            onChange={(e) => setFieldValue(field.key, e.target.value)}
            placeholder={field.placeholder}
            multiline={field.multiline}
            rows={field.rows}
            required={field.required}
            sx={field.sx}
            fullWidth
          />
        );

      case 'autocomplete':
        return (
          <Autocomplete
            key={field.key}
            options={field.searchOptions || []}
            value={value as string}
            onChange={(_, newValue) => setFieldValue(field.key, newValue || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label={field.label}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}
            freeSolo
            sx={field.sx}
            fullWidth
          />
        );

      default:
        return null;
    }
  };

  const renderFieldGroup = (group: FieldGroup) => {
    const visibleFields = group.fields.filter((fieldKey) => {
      const field = config.fields.find((f) => f.key === fieldKey);
      return (
        field && (!field.condition || field.condition(subcategory, fieldValues))
      );
    });

    if (visibleFields.length === 0) {
      return null;
    }

    return (
      <Box key={group.title || group.fields.join('-')}>
        {group.title && (
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            {group.title}
          </Typography>
        )}
        <Stack
          direction={group.sx?.flexDirection === 'row' ? 'row' : 'column'}
          spacing={2}
          sx={group.sx}
        >
          {visibleFields.map((fieldKey) => {
            const field = config.fields.find((f) => f.key === fieldKey);
            return field ? renderField(field) : null;
          })}
        </Stack>
      </Box>
    );
  };

  const getVisibleFields = () => {
    if (config.getVisibleFields) {
      return config.getVisibleFields(subcategory);
    }
    return config.fields
      .filter(
        (field) =>
          !field.condition || field.condition(subcategory, fieldValues),
      )
      .map((field) => field.key);
  };

  const visibleFieldKeys = getVisibleFields();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        {/* Name field - only show if allowed for this item type */}
        {config.allowName && (
          <TextField
            label={config.nameLabel}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={config.namePlaceholder}
            required={config.nameRequired}
            fullWidth
          />
        )}

        {/* Subcategory field */}
        <FormControl fullWidth>
          <InputLabel>{config.subcategoryLabel}</InputLabel>
          <Select
            value={subcategory}
            label={config.subcategoryLabel}
            onChange={(e) => setSubcategory(e.target.value)}
          >
            {config.subcategoryOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Field groups */}
        {config.fieldGroups?.map((group) => renderFieldGroup(group))}

        {/* Individual fields (if not in groups) */}
        {!config.fieldGroups && (
          <Stack spacing={2}>
            {config.fields
              .filter((field) => visibleFieldKeys.includes(field.key))
              .map((field) => renderField(field))}
          </Stack>
        )}

        {/* Notes field */}
        <TextField
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={config.notesPlaceholder}
          multiline
          rows={3}
          fullWidth
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default ConfigurableItemForm;
