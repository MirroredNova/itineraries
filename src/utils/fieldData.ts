import { FieldData } from '@/types/schemas.types';

/**
 * Type guard to check if field data is for a specific item type
 */
export function isHotelFieldData(
  fieldData: FieldData,
): fieldData is FieldData & { checkInTime?: string; checkOutTime?: string } {
  return 'checkInTime' in fieldData || 'checkOutTime' in fieldData;
}

export function isRestaurantFieldData(
  fieldData: FieldData,
): fieldData is FieldData & { cuisine?: string; reservationTime?: string } {
  return 'cuisine' in fieldData || 'reservationTime' in fieldData;
}

export function isActivityFieldData(
  fieldData: FieldData,
): fieldData is FieldData & {
  duration?: string;
  startTime?: string;
  endTime?: string;
} {
  return (
    'duration' in fieldData ||
    'startTime' in fieldData ||
    'endTime' in fieldData
  );
}

export function isTransportFieldData(
  fieldData: FieldData,
): fieldData is FieldData & {
  flightNumber?: string;
  departureTime?: string;
  arrivalTime?: string;
  departureAirport?: string;
  arrivalAirport?: string;
} {
  return (
    'flightNumber' in fieldData ||
    'departureTime' in fieldData ||
    'arrivalTime' in fieldData
  );
}

/**
 * Get field data with proper typing based on item type
 */
export function getTypedFieldData(fieldData: unknown): FieldData {
  if (!fieldData || typeof fieldData !== 'object') {
    return {};
  }

  return fieldData as FieldData;
}

/**
 * Safely access field data properties with fallback
 */
export function getFieldValue(fieldData: FieldData, key: string): unknown {
  return (fieldData as Record<string, unknown>)[key];
}

/**
 * Get a string value from field data with fallback
 */
export function getStringField(
  fieldData: FieldData,
  key: string,
): string | undefined {
  const value = getFieldValue(fieldData, key);
  return typeof value === 'string' ? value : undefined;
}

/**
 * Get an array value from field data with fallback
 */
export function getArrayField(
  fieldData: FieldData,
  key: string,
): unknown[] | undefined {
  const value = getFieldValue(fieldData, key);
  return Array.isArray(value) ? value : undefined;
}
