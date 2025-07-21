import {
  templatesTable,
  templateDaysTable,
  templateItemsTable,
} from '@/server/utils/db/schemas/Templates';

export type TemplateTableType = typeof templatesTable.$inferSelect;
export type TemplateDayTableType = typeof templateDaysTable.$inferSelect;
export type TemplateItemTableType = typeof templateItemsTable.$inferSelect;

// Item types remain the same
export type TemplateItemType =
  | 'hotel'
  | 'restaurant'
  | 'activity'
  | 'transport'
  | 'custom';

// Subcategory types for better type safety
export type TemplateItemSubcategory =
  // Hotel subcategories
  | 'checkin'
  | 'checkout'
  | 'breakfast'
  | 'amenities'
  // Restaurant subcategories
  | 'lunch'
  | 'dinner'
  | 'breakfast'
  | 'snack'
  | 'coffee'
  // Activity subcategories
  | 'tour'
  | 'museum'
  | 'shopping'
  | 'entertainment'
  | 'outdoor'
  | 'wellness'
  // Transport subcategories
  | 'car_rental'
  | 'public_transit'
  | 'taxi'
  | 'walking'
  | 'flight_departure'
  | 'flight_arrival'
  | 'train'
  | 'bus'
  // Custom subcategories
  | 'meeting'
  | 'photo'
  | 'emergency'
  | 'info';

// Common tag types for better type safety
export type CommonTagType =
  | 'morning'
  | 'afternoon'
  | 'evening'
  | 'night'
  | 'downtown'
  | 'airport'
  | 'suburbs'
  | 'beach'
  | 'mountains'
  | 'city-center'
  | 'food'
  | 'culture'
  | 'shopping'
  | 'entertainment'
  | 'transportation'
  | 'accommodation'
  | 'wellness'
  | 'outdoor'
  | 'indoor'
  | 'family-friendly'
  | 'romantic'
  | 'budget'
  | 'luxury'
  | 'quick'
  | 'relaxing'
  | 'adventure';

// Type-safe field data definitions
export interface BaseFieldData {
  location?: string;
  notes?: string;
}

export interface HotelFieldData extends BaseFieldData {
  hotelName?: string;
  checkInTime?: string;
  checkOutTime?: string;
  roomType?: string;
  amenities?: string[];
  priceRange?: string;
  confirmationNumber?: string;
}

export interface RestaurantFieldData extends BaseFieldData {
  restaurantName?: string;
  cuisine?: string;
  priceRange?: string;
  reservationTime?: string;
  dressCode?: string;
  phoneNumber?: string;
}

export interface ActivityFieldData extends BaseFieldData {
  activityName?: string;
  duration?: string;
  price?: string;
  difficulty?: string;
  ageRestriction?: string;
  bookingRequired?: boolean;
  startTime?: string;
  endTime?: string;
}

export interface TransportFieldData extends BaseFieldData {
  transportNumber?: string;
  departureTime?: string;
  arrivalTime?: string;
  departureLocation?: string;
  arrivalLocation?: string;
  departureAirport?: string;
  arrivalAirport?: string;
  flightNumber?: string;
  airline?: string;
  seatNumber?: string;
  confirmationNumber?: string;
  transportType?: string;
}

export interface CustomFieldData extends BaseFieldData {
  customName?: string;
  customType?: string;
  customValue?: string;
  time?: string;
}

// Union type for all field data
export type FieldData =
  | HotelFieldData
  | RestaurantFieldData
  | ActivityFieldData
  | TransportFieldData
  | CustomFieldData;

// Simplified day interface - no more groups
export interface TemplateDay {
  id: number;
  templateId: number;
  dayNumber: number;
  order: number;
  items: TemplateItemTableType[]; // Items that belong directly to the day
}
