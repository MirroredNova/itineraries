'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getTemplateDaysGroupsAndItemsAction,
  addTemplateDayAction,
  deleteTemplateDayAction,
  addTemplateItemAction,
  updateTemplateItemAction,
  deleteTemplateItemAction,
} from '@/server/actions/template.actions';
import {
  TemplateDay,
  TemplateItemType,
  TemplateItemTableType,
} from '@/types/schemas.types';

export const useTemplateDays = (templateId: number) => {
  const [days, setDays] = useState<TemplateDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDays = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedDays = await getTemplateDaysGroupsAndItemsAction(templateId);
      setDays(fetchedDays);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch days');
    } finally {
      setLoading(false);
    }
  }, [templateId]);

  useEffect(() => {
    fetchDays();
  }, [fetchDays, templateId]);

  const handleAddDay = async (dayId?: number, before: boolean = false) => {
    // Optimistically add the day to the UI
    const tempId = Date.now();
    const newDay: TemplateDay = {
      id: tempId,
      templateId,
      dayNumber: 0, // Will be set by server
      order: 0, // Will be set by server
      items: [],
    };

    setDays((prevDays) => {
      if (!dayId) {
        // Add at the end
        return [...prevDays, newDay];
      }

      // Insert at specific position
      const targetIndex = prevDays.findIndex((day) => day.id === dayId);
      if (targetIndex === -1) return prevDays;

      const insertIndex = before ? targetIndex : targetIndex + 1;
      const newDays = [...prevDays];
      newDays.splice(insertIndex, 0, newDay);
      return newDays;
    });

    try {
      const serverDay = await addTemplateDayAction(
        templateId,
        dayId ? { dayId, before } : undefined,
      );

      // Replace the temporary day with the real one from server
      setDays((prevDays) =>
        prevDays.map((day) =>
          day.id === tempId
            ? { ...serverDay, items: [] } // Ensure items property exists
            : day,
        ),
      );
    } catch (error) {
      // Revert on error
      setDays((prevDays) => prevDays.filter((day) => day.id !== tempId));
      throw error;
    }
  };

  const handleDeleteDay = async (dayId: number) => {
    // Optimistically remove the day from the UI
    setDays((prevDays) => prevDays.filter((day) => day.id !== dayId));

    try {
      await deleteTemplateDayAction(dayId);
    } catch (error) {
      // Revert on error by refetching
      await fetchDays();
      throw error;
    }
  };

  const handleAddItem = async (
    dayId: number,
    type: TemplateItemType,
    subcategory?: string,
    fieldData?: Record<string, unknown>,
    notes?: string,
    tags?: string[],
    name?: string,
  ) => {
    // Optimistically add the item to the UI
    const tempId = Date.now();
    const newItem: TemplateItemTableType = {
      id: tempId,
      templateId,
      dayId,
      name: name || null,
      type,
      subcategory: subcategory || null,
      time: null,
      tags: tags || null,
      order: 0,
      notes: notes || null,
      fieldData: fieldData || null,
      createdAt: new Date(),
    };

    setDays((prevDays) =>
      prevDays.map((day) =>
        day.id === dayId
          ? {
              ...day,
              items: [...day.items, newItem],
            }
          : day,
      ),
    );

    try {
      // Add item to server
      const serverItem = await addTemplateItemAction(
        templateId,
        dayId,
        type,
        subcategory,
        fieldData,
        notes,
        tags,
        name,
      );

      // Replace the temporary item with the real one from server
      setDays((prevDays) =>
        prevDays.map((day) =>
          day.id === dayId
            ? {
                ...day,
                items: day.items.map((item) =>
                  item.id === tempId ? serverItem : item,
                ),
              }
            : day,
        ),
      );
    } catch (error) {
      // Revert on error
      setDays((prevDays) =>
        prevDays.map((day) =>
          day.id === dayId
            ? {
                ...day,
                items: day.items.filter((item) => item.id !== tempId),
              }
            : day,
        ),
      );
      throw error;
    }
  };

  const handleEditItem = async (
    itemId: number,
    type: TemplateItemType,
    notes: string,
    subcategory?: string,
    fieldData?: Record<string, unknown>,
    tags?: string[],
    name?: string,
  ) => {
    // Optimistically update the item in the UI
    setDays((prevDays) =>
      prevDays.map((day) => ({
        ...day,
        items: day.items.map((item) =>
          item.id === itemId
            ? {
                ...item,
                type,
                name: name || null,
                notes,
                subcategory: subcategory || null,
                fieldData: fieldData || null,
                tags: tags || null,
              }
            : item,
        ),
      })),
    );

    try {
      await updateTemplateItemAction(
        itemId,
        type,
        notes,
        subcategory,
        fieldData,
        tags,
        name,
      );
    } catch (error) {
      // Revert on error by refetching
      await fetchDays();
      throw error;
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    // Optimistically remove the item from the UI
    setDays((prevDays) =>
      prevDays.map((day) => ({
        ...day,
        items: day.items.filter((item) => item.id !== itemId),
      })),
    );

    try {
      await deleteTemplateItemAction(itemId);
    } catch (error) {
      // Revert on error by refetching
      await fetchDays();
      throw error;
    }
  };

  return {
    days,
    loading,
    error,
    fetchDays,
    handleAddDay,
    handleDeleteDay,
    handleAddItem,
    handleEditItem,
    handleDeleteItem,
  };
};
