'use client';

import React, { useState } from 'react';
import {
  Card,
  Typography,
  Stack,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Chip,
  Box,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useTemplateDays } from './hooks/useTemplateDays';
import {
  TemplateDay,
  TemplateItemTableType,
  TemplateItemType,
} from '@/types/schemas.types';
import ItemCard from './components/ItemCard';
import AddItemModal from './modals/AddItemModal';
import EditItemModal from './modals/EditItemModal';
import ConfirmDialog from './components/ConfirmDialog';
import EmptyState from './components/EmptyState';

interface DayListProps {
  templateId: number;
}

const DayList = ({ templateId }: DayListProps) => {
  const {
    days,
    loading,
    error,
    handleAddDay,
    handleDeleteDay,
    handleAddItem,
    handleEditItem,
    handleDeleteItem,
  } = useTemplateDays(templateId);

  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [editItemModalOpen, setEditItemModalOpen] = useState(false);
  const [deleteItemDialogOpen, setDeleteItemDialogOpen] = useState(false);
  const [deleteDayDialogOpen, setDeleteDayDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<TemplateDay | null>(null);
  const [selectedItem, setSelectedItem] =
    useState<TemplateItemTableType | null>(null);
  const [dayMenuAnchor, setDayMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedDayForMenu, setSelectedDayForMenu] =
    useState<TemplateDay | null>(null);

  if (loading) {
    return (
      <Stack spacing={3} alignItems="center" sx={{ py: 4 }}>
        <Typography>Loading template...</Typography>
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  const handleAddItemClick = (day: TemplateDay) => {
    setSelectedDay(day);
    setAddItemModalOpen(true);
  };

  const handleEditItemClick = (item: TemplateItemTableType) => {
    setSelectedItem(item);
    setEditItemModalOpen(true);
  };

  const handleDeleteItemClick = (item: TemplateItemTableType) => {
    setSelectedItem(item);
    setDeleteItemDialogOpen(true);
  };

  const handleDeleteDayClick = (day: TemplateDay) => {
    setSelectedDay(day);
    setDeleteDayDialogOpen(true);
  };

  const handleDayMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    day: TemplateDay,
  ) => {
    setDayMenuAnchor(event.currentTarget);
    setSelectedDayForMenu(day);
  };

  const handleDayMenuClose = () => {
    setDayMenuAnchor(null);
    setSelectedDayForMenu(null);
  };

  const handleAddDayAtPosition = async (before: boolean) => {
    if (selectedDayForMenu) {
      await handleAddDay(selectedDayForMenu.id, before);
    }
    handleDayMenuClose();
  };

  const handleConfirmDeleteDay = async () => {
    if (selectedDay) {
      await handleDeleteDay(selectedDay.id);
      setDeleteDayDialogOpen(false);
      setSelectedDay(null);
    }
  };

  const handleConfirmDeleteItem = async () => {
    if (selectedItem) {
      await handleDeleteItem(selectedItem.id);
      setDeleteItemDialogOpen(false);
      setSelectedItem(null);
    }
  };

  const handleCreateItem = async (
    type: TemplateItemType,
    notes: string,
    subcategory?: string,
    fieldData?: Record<string, unknown>,
    tags?: string[],
    name?: string,
  ) => {
    if (selectedDay) {
      await handleAddItem(
        selectedDay.id,
        type,
        subcategory,
        fieldData,
        notes,
        tags,
        name,
      );
      setAddItemModalOpen(false);
      setSelectedDay(null);
    }
  };

  const handleUpdateItem = async (
    type: TemplateItemType,
    notes: string,
    subcategory?: string,
    fieldData?: Record<string, unknown>,
    tags?: string[],
    name?: string,
  ) => {
    if (selectedItem) {
      await handleEditItem(
        selectedItem.id,
        type,
        notes,
        subcategory,
        fieldData,
        tags,
        name,
      );
      setEditItemModalOpen(false);
      setSelectedItem(null);
    }
  };

  return (
    <Stack spacing={4}>
      {days.length === 0 ? (
        <EmptyState onAddDay={() => handleAddDay()} />
      ) : (
        days.map((day) => (
          <Card
            key={day.id}
            sx={{
              p: 3,
              borderRadius: 3,
            }}
          >
            <Stack spacing={3}>
              {/* Day Header */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Day {day.dayNumber}
                  </Typography>
                  <Chip
                    label={`${day.items.length} items`}
                    size="small"
                    variant="outlined"
                  />
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleAddItemClick(day)}
                  >
                    Add Item
                  </Button>
                  <IconButton
                    onClick={(e) => handleDayMenuOpen(e, day)}
                    sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Stack>
              </Stack>

              {/* Items */}
              {day.items.length === 0 ? (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    No items yet. Add your first item to get started!
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={2}>
                  {day.items.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onEdit={handleEditItemClick}
                      onDelete={handleDeleteItemClick}
                    />
                  ))}
                </Stack>
              )}
            </Stack>
          </Card>
        ))
      )}

      {/* Add Day Button */}
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => handleAddDay()}
        sx={{ alignSelf: 'center', px: 4, py: 1.5 }}
      >
        Add Day
      </Button>

      {/* Modals and Dialogs */}
      <AddItemModal
        open={addItemModalOpen}
        onClose={() => {
          setAddItemModalOpen(false);
          setSelectedDay(null);
        }}
        onSubmit={handleCreateItem}
        days={days}
      />

      <EditItemModal
        open={editItemModalOpen}
        onClose={() => {
          setEditItemModalOpen(false);
          setSelectedItem(null);
        }}
        onSubmit={handleUpdateItem}
        item={selectedItem}
      />

      <ConfirmDialog
        open={deleteItemDialogOpen}
        onClose={() => setDeleteItemDialogOpen(false)}
        onConfirm={handleConfirmDeleteItem}
        title="Delete Item"
        message={`Are you sure you want to delete this ${selectedItem?.type}?`}
        confirmText="Delete"
        confirmColor="error"
      />

      <ConfirmDialog
        open={deleteDayDialogOpen}
        onClose={() => setDeleteDayDialogOpen(false)}
        onConfirm={handleConfirmDeleteDay}
        title="Delete Day"
        message={`Are you sure you want to delete Day ${selectedDay?.dayNumber}? This will also delete all items in this day.`}
        confirmText="Delete"
        confirmColor="error"
      />

      {/* Day Options Menu */}
      <Menu
        anchorEl={dayMenuAnchor}
        open={Boolean(dayMenuAnchor)}
        onClose={handleDayMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleAddDayAtPosition(true)}>
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          Add Day Before
        </MenuItem>
        <MenuItem onClick={() => handleAddDayAtPosition(false)}>
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          Add Day After
        </MenuItem>
        <MenuItem
          onClick={() => handleDeleteDayClick(selectedDayForMenu!)}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ color: 'error.main' }} />
          </ListItemIcon>
          Delete Day
        </MenuItem>
      </Menu>
    </Stack>
  );
};

export default DayList;
