'use client';

import { useMemo } from 'react';
import { TemplateDay, TemplateItemTableType } from '@/types/schemas.types';

interface IncompleteFlight {
  item: TemplateItemTableType;
  day: TemplateDay;
  missingType: 'departure' | 'arrival';
}

export const useIncompleteFlights = (days: TemplateDay[]) => {
  const incompleteFlights = useMemo(() => {
    const flights: IncompleteFlight[] = [];
    const flightMap = new Map<
      string,
      { item: TemplateItemTableType; day: TemplateDay }[]
    >();

    // Group flights by transport number
    days.forEach((day) => {
      day.items.forEach((item) => {
        if (
          item.type === 'transport' &&
          item.subcategory?.startsWith('flight_')
        ) {
          const fieldData = (item.fieldData as Record<string, unknown>) || {};
          const flightNumber = fieldData.flightNumber as string;
          const key = flightNumber || `flight_${item.id}`; // Use flight number or item ID as key

          if (!flightMap.has(key)) {
            flightMap.set(key, []);
          }
          flightMap.get(key)!.push({ item, day });
        }
      });
    });

    // Find incomplete flights
    flightMap.forEach((flightItems) => {
      const hasDeparture = flightItems.some(
        ({ item }) => item.subcategory === 'flight_departure',
      );
      const hasArrival = flightItems.some(
        ({ item }) => item.subcategory === 'flight_arrival',
      );

      if (hasDeparture && !hasArrival) {
        const departureItem = flightItems.find(
          ({ item }) => item.subcategory === 'flight_departure',
        )!;
        flights.push({
          item: departureItem.item,
          day: departureItem.day,
          missingType: 'arrival',
        });
      } else if (hasArrival && !hasDeparture) {
        const arrivalItem = flightItems.find(
          ({ item }) => item.subcategory === 'flight_arrival',
        )!;
        flights.push({
          item: arrivalItem.item,
          day: arrivalItem.day,
          missingType: 'departure',
        });
      }
    });

    return flights;
  }, [days]);

  return {
    incompleteFlights,
  };
};
