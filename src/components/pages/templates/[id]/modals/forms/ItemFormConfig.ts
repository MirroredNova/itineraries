import { TemplateItemType } from '@/types/schemas.types';

export interface FormField {
  key: string;
  type: 'text' | 'select' | 'time' | 'textarea' | 'autocomplete';
  label: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  multiline?: boolean;
  rows?: number;
  sx?: Record<string, unknown>;
  required?: boolean;
  // More flexible condition system
  condition?: (
    subcategory: string,
    fieldValues: Record<string, unknown>,
  ) => boolean;
  // For autocomplete fields
  searchOptions?: string[];
  // For grouped fields
  group?: string;
}

export interface FieldGroup {
  title?: string;
  fields: string[]; // Array of field keys
  sx?: Record<string, unknown>;
}

export interface ItemFormConfig {
  nameLabel: string;
  namePlaceholder: string;
  nameRequired?: boolean;
  allowName?: boolean; // New field to control if name field is shown
  subcategoryLabel: string;
  subcategoryOptions: { value: string; label: string }[];
  fields: FormField[];
  fieldGroups?: FieldGroup[];
  notesPlaceholder: string;
  // Function to determine which fields to show based on subcategory
  getVisibleFields?: (subcategory: string) => string[];
}

// Transport-specific fields
const transportFields = {
  departureLocation: {
    key: 'departureLocation',
    type: 'text' as const,
    label: 'Departure Location',
    placeholder: 'e.g., Hotel, Metro Station',
    sx: { flex: 1 },
    required: false,
    condition: (subcategory: string) => subcategory !== 'flight',
  },
  arrivalLocation: {
    key: 'arrivalLocation',
    type: 'text' as const,
    label: 'Arrival Location',
    placeholder: 'e.g., Louvre Museum, Airport',
    sx: { flex: 1 },
    required: false,
    condition: (subcategory: string) => subcategory !== 'flight',
  },
  departureTime: {
    key: 'departureTime',
    type: 'time' as const,
    label: 'Departure Time',
    placeholder: 'Select departure time',
    sx: { flex: 1 },
    required: false,
  },
  arrivalTime: {
    key: 'arrivalTime',
    type: 'time' as const,
    label: 'Arrival Time',
    placeholder: 'Select arrival time',
    sx: { flex: 1 },
    required: false,
  },
  transportNumber: {
    key: 'transportNumber',
    type: 'text' as const,
    label: 'Transport Number/Line',
    placeholder: 'e.g., Line 1, Bus 38',
    required: false,
  },
};

// Flight-specific fields
const flightFields = {
  airline: {
    key: 'airline',
    type: 'autocomplete' as const,
    label: 'Airline',
    placeholder: 'e.g., Delta, United',
    sx: { flex: 1 },
    required: false,
    condition: (subcategory: string) =>
      subcategory === 'flight_departure' || subcategory === 'flight_arrival',
    searchOptions: [
      'Delta',
      'United',
      'American',
      'Southwest',
      'JetBlue',
      'Alaska',
      'Spirit',
      'Frontier',
      'Air Canada',
      'WestJet',
      'British Airways',
      'Lufthansa',
      'Air France',
      'KLM',
      'Emirates',
      'Qatar Airways',
      'Singapore Airlines',
    ],
  },
  flightNumber: {
    key: 'flightNumber',
    type: 'text' as const,
    label: 'Flight Number',
    placeholder: 'e.g., DL123',
    sx: { flex: 1 },
    required: false,
    condition: (subcategory: string) =>
      subcategory === 'flight_departure' || subcategory === 'flight_arrival',
  },
  departureAirport: {
    key: 'departureAirport',
    type: 'autocomplete' as const,
    label: 'Departure Airport',
    placeholder: 'e.g., JFK',
    sx: { flex: 1 },
    required: false,
    condition: (subcategory: string) => subcategory === 'flight_departure',
    searchOptions: [
      'JFK',
      'LAX',
      'ORD',
      'DFW',
      'ATL',
      'DEN',
      'SFO',
      'CLT',
      'LAS',
      'MCO',
      'MIA',
      'IAH',
      'PHX',
      'BOS',
      'DTW',
      'MSP',
      'FLL',
      'EWR',
      'SEA',
      'BWI',
      'CDG',
      'LHR',
      'FRA',
      'AMS',
      'MAD',
      'BCN',
      'FCO',
      'MXP',
      'ZRH',
      'VIE',
    ],
  },
  arrivalAirport: {
    key: 'arrivalAirport',
    type: 'autocomplete' as const,
    label: 'Arrival Airport',
    placeholder: 'e.g., CDG',
    sx: { flex: 1 },
    required: false,
    condition: (subcategory: string) => subcategory === 'flight_arrival',
    searchOptions: [
      'JFK',
      'LAX',
      'ORD',
      'DFW',
      'ATL',
      'DEN',
      'SFO',
      'CLT',
      'LAS',
      'MCO',
      'MIA',
      'IAH',
      'PHX',
      'BOS',
      'DTW',
      'MSP',
      'FLL',
      'EWR',
      'SEA',
      'BWI',
      'CDG',
      'LHR',
      'FRA',
      'AMS',
      'MAD',
      'BCN',
      'FCO',
      'MXP',
      'ZRH',
      'VIE',
    ],
  },
};

export const itemFormConfigs: Record<TemplateItemType, ItemFormConfig> = {
  hotel: {
    nameLabel: 'Hotel Name',
    namePlaceholder: 'e.g., Grand Hotel, Hilton Downtown',
    nameRequired: false,
    allowName: true, // Hotels need names to be useful
    subcategoryLabel: 'Hotel Activity',
    subcategoryOptions: [
      { value: '', label: 'General' },
      { value: 'checkin', label: 'Check-in' },
      { value: 'checkout', label: 'Check-out' },
      { value: 'breakfast', label: 'Breakfast' },
      { value: 'amenities', label: 'Amenities' },
    ],
    fields: [
      {
        key: 'checkInTime',
        type: 'time',
        label: 'Check-in Time',
        placeholder: 'Select check-in time',
        required: false,
        condition: (subcategory: string) => subcategory === 'checkin',
      },
      {
        key: 'checkOutTime',
        type: 'time',
        label: 'Check-out Time',
        placeholder: 'Select check-out time',
        required: false,
        condition: (subcategory: string) => subcategory === 'checkout',
      },
    ],
    fieldGroups: [
      {
        title: 'Timing',
        fields: ['checkInTime', 'checkOutTime'],
      },
    ],
    notesPlaceholder: 'Room number, special requests, amenities, etc.',
  },
  restaurant: {
    nameLabel: 'Restaurant Name',
    namePlaceholder: 'e.g., Le Petit Bistro, Sushi Palace',
    nameRequired: false,
    allowName: true, // Restaurants need names to be useful
    subcategoryLabel: 'Meal Type',
    subcategoryOptions: [
      { value: '', label: 'General' },
      { value: 'breakfast', label: 'Breakfast' },
      { value: 'lunch', label: 'Lunch' },
      { value: 'dinner', label: 'Dinner' },
      { value: 'snack', label: 'Snack' },
      { value: 'coffee', label: 'Coffee' },
    ],
    fields: [
      {
        key: 'cuisine',
        type: 'text',
        label: 'Cuisine',
        placeholder: 'e.g., Italian, Japanese, French',
        sx: { flex: 1 },
        required: false,
      },
      {
        key: 'priceRange',
        type: 'select',
        label: 'Price Range',
        options: [
          { value: '', label: 'Any' },
          { value: '$', label: '$ (Budget)' },
          { value: '$$', label: '$$ (Moderate)' },
          { value: '$$$', label: '$$$ (Expensive)' },
          { value: '$$$$', label: '$$$$ (Luxury)' },
        ],
        sx: { flex: 1 },
        required: false,
      },
      {
        key: 'reservationTime',
        type: 'time',
        label: 'Reservation Time',
        placeholder: 'Select reservation time',
        required: false,
      },
    ],
    fieldGroups: [
      {
        title: 'Restaurant Details',
        fields: ['cuisine', 'priceRange'],
        sx: { flexDirection: 'row', gap: 2 },
      },
      {
        title: 'Timing',
        fields: ['reservationTime'],
      },
    ],
    notesPlaceholder: 'Reservation number, dress code, special requests, etc.',
  },
  activity: {
    nameLabel: 'Activity Name (Optional)',
    namePlaceholder: 'e.g., Louvre Museum Visit, City Walking Tour',
    nameRequired: false,
    allowName: false, // Activities can be abstract in templates
    subcategoryLabel: 'Activity Type',
    subcategoryOptions: [
      { value: '', label: 'General' },
      { value: 'tour', label: 'Tour' },
      { value: 'museum', label: 'Museum' },
      { value: 'shopping', label: 'Shopping' },
      { value: 'entertainment', label: 'Entertainment' },
      { value: 'outdoor', label: 'Outdoor' },
      { value: 'wellness', label: 'Wellness' },
    ],
    fields: [
      {
        key: 'location',
        type: 'text',
        label: 'Location',
        placeholder: 'e.g., Louvre Museum, Champs-Élysées',
        required: false,
      },
      {
        key: 'startTime',
        type: 'time',
        label: 'Start Time',
        placeholder: 'Select start time',
        sx: { flex: 1 },
        required: false,
      },
      {
        key: 'endTime',
        type: 'time',
        label: 'End Time',
        placeholder: 'Select end time',
        sx: { flex: 1 },
        required: false,
      },
      {
        key: 'duration',
        type: 'select',
        label: 'Duration',
        options: [
          { value: '', label: 'Flexible' },
          { value: '30min', label: '30 minutes' },
          { value: '1hour', label: '1 hour' },
          { value: '2hours', label: '2 hours' },
          { value: '3hours', label: '3 hours' },
          { value: '4hours', label: '4 hours' },
          { value: 'half-day', label: 'Half day' },
          { value: 'full-day', label: 'Full day' },
        ],
        required: false,
      },
    ],
    fieldGroups: [
      {
        title: 'Location',
        fields: ['location'],
      },
      {
        title: 'Timing',
        fields: ['startTime', 'endTime'],
        sx: { flexDirection: 'row', gap: 2 },
      },
      {
        title: 'Details',
        fields: ['duration'],
      },
    ],
    notesPlaceholder: 'Ticket information, meeting point, what to bring, etc.',
  },
  transport: {
    nameLabel: 'Transport Description (Optional)',
    namePlaceholder: 'e.g., Metro to Louvre, Taxi to Airport',
    nameRequired: false,
    allowName: false, // Transport can be abstract in templates
    subcategoryLabel: 'Transport Type',
    subcategoryOptions: [
      { value: '', label: 'General' },
      { value: 'car_rental', label: 'Car Rental' },
      { value: 'public_transit', label: 'Public Transit' },
      { value: 'taxi', label: 'Taxi' },
      { value: 'walking', label: 'Walking' },
      { value: 'train', label: 'Train' },
      { value: 'bus', label: 'Bus' },
      { value: 'flight_departure', label: 'Flight - Departure' },
      { value: 'flight_arrival', label: 'Flight - Arrival' },
    ],
    fields: [
      // Common transport fields
      transportFields.departureLocation,
      transportFields.arrivalLocation,
      transportFields.departureTime,
      transportFields.arrivalTime,
      transportFields.transportNumber,
      // Flight-specific fields
      flightFields.airline,
      flightFields.flightNumber,
      flightFields.departureAirport,
      flightFields.arrivalAirport,
    ],

    notesPlaceholder: 'Platform number, ticket information, directions, etc.',
    getVisibleFields: (subcategory: string) => {
      const baseFields = ['departureTime', 'arrivalTime', 'transportNumber'];

      if (subcategory === 'flight_departure') {
        return [
          'departureTime',
          'airline',
          'flightNumber',
          'departureAirport',
          'arrivalAirport',
        ];
      }

      if (subcategory === 'flight_arrival') {
        return [
          'arrivalTime',
          'airline',
          'flightNumber',
          'departureAirport',
          'arrivalAirport',
        ];
      }

      if (subcategory === 'walking') {
        return ['departureLocation', 'arrivalLocation'];
      }

      if (subcategory === 'train') {
        return [
          'departureTime',
          'arrivalTime',
          'transportNumber', // Train number/line
          'departureLocation',
          'arrivalLocation',
        ];
      }

      if (subcategory === 'bus') {
        return [
          'departureTime',
          'arrivalTime',
          'transportNumber', // Bus number/line
          'departureLocation',
          'arrivalLocation',
        ];
      }

      return [...baseFields, 'departureLocation', 'arrivalLocation'];
    },
  },
  custom: {
    nameLabel: 'Item Name (Optional)',
    namePlaceholder: 'e.g., Meeting, Photo Stop, Emergency Contact',
    nameRequired: false,
    allowName: true, // Custom items can have names for clarity
    subcategoryLabel: 'Category',
    subcategoryOptions: [
      { value: '', label: 'General' },
      { value: 'meeting', label: 'Meeting' },
      { value: 'photo', label: 'Photo' },
      { value: 'emergency', label: 'Emergency' },
      { value: 'info', label: 'Information' },
    ],
    fields: [
      {
        key: 'time',
        type: 'time',
        label: 'Time (Optional)',
        placeholder: 'Select time',
        required: false,
      },
    ],
    notesPlaceholder: 'Additional details, location, contact information, etc.',
  },
};
