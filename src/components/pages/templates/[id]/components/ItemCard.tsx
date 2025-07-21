'use client';

import React, { useState } from 'react';
import {
  Card,
  Typography,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Chip,
  Box,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Hotel as HotelIcon,
  Restaurant as RestaurantIcon,
  DirectionsWalk as ActivityIcon,
  DirectionsCar as TransportIcon,
  Star as CustomIcon,
} from '@mui/icons-material';
import { TemplateItemTableType, FieldData } from '@/types/schemas.types';

interface ItemCardProps {
  item: TemplateItemTableType;
  onEdit: (item: TemplateItemTableType) => void;
  onDelete: (item: TemplateItemTableType) => void;
}

const ItemCard = ({ item, onEdit, onDelete }: ItemCardProps) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  // Get color for each item type from theme
  const getItemTypeColor = (type: string) => {
    switch (type) {
      case 'hotel':
        return theme.palette.itemTypes.hotel;
      case 'restaurant':
        return theme.palette.itemTypes.restaurant;
      case 'activity':
        return theme.palette.itemTypes.activity;
      case 'transport':
        return theme.palette.itemTypes.transport;
      case 'custom':
        return theme.palette.itemTypes.custom;
      default:
        return theme.palette.itemTypes.custom;
    }
  };

  const getSubcategoryLabel = (type: string, subcategory: string | null) => {
    if (type !== 'transport' || !subcategory) return null;

    const labels = {
      flight_departure: 'Flight - Departure',
      flight_arrival: 'Flight - Arrival',
      train: 'Train',
      bus: 'Bus',
      car_rental: 'Car Rental',
      public_transit: 'Public Transit',
      taxi: 'Taxi',
      walking: 'Walking',
    };

    return labels[subcategory as keyof typeof labels] || subcategory;
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleEdit = () => {
    onEdit(item);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(item);
    handleMenuClose();
  };

  const getFieldData = (): FieldData => {
    if (!item.fieldData || typeof item.fieldData !== 'object') {
      return {};
    }
    return item.fieldData as FieldData;
  };

  const formatTime = (timeValue: unknown) => {
    if (!timeValue) return null;

    if (typeof timeValue === 'string') {
      // Handle HH:MM format
      if (timeValue.match(/^\d{2}:\d{2}$/)) {
        const [hours, minutes] = timeValue.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        return `${displayHour}:${minutes}${ampm}`;
      }
      return timeValue;
    }

    return String(timeValue);
  };

  const getTimeDisplay = () => {
    const fieldData = getFieldData();

    switch (item.type) {
      case 'hotel':
        if (
          item.subcategory === 'checkin' &&
          'checkInTime' in fieldData &&
          fieldData.checkInTime
        ) {
          return `Check-in: ${formatTime(fieldData.checkInTime)}`;
        }
        if (
          item.subcategory === 'checkout' &&
          'checkOutTime' in fieldData &&
          fieldData.checkOutTime
        ) {
          return `Check-out: ${formatTime(fieldData.checkOutTime)}`;
        }
        if (
          'checkInTime' in fieldData &&
          'checkOutTime' in fieldData &&
          fieldData.checkInTime &&
          fieldData.checkOutTime
        ) {
          return `${formatTime(fieldData.checkInTime)} - ${formatTime(fieldData.checkOutTime)}`;
        }
        if ('checkInTime' in fieldData && fieldData.checkInTime) {
          return `Check-in: ${formatTime(fieldData.checkInTime)}`;
        }
        if ('checkOutTime' in fieldData && fieldData.checkOutTime) {
          return `Check-out: ${formatTime(fieldData.checkOutTime)}`;
        }
        break;
      case 'restaurant':
        if ('reservationTime' in fieldData && fieldData.reservationTime) {
          return formatTime(fieldData.reservationTime);
        }
        break;
      case 'activity':
        if (
          'startTime' in fieldData &&
          'endTime' in fieldData &&
          fieldData.startTime &&
          fieldData.endTime
        ) {
          return `${formatTime(fieldData.startTime)} - ${formatTime(fieldData.endTime)}`;
        }
        if ('startTime' in fieldData && fieldData.startTime) {
          return formatTime(fieldData.startTime);
        }
        if ('endTime' in fieldData && fieldData.endTime) {
          return `Until ${formatTime(fieldData.endTime)}`;
        }
        break;
      case 'transport':
        if (
          item.subcategory === 'flight_departure' &&
          'departureTime' in fieldData &&
          fieldData.departureTime
        ) {
          return `Depart: ${formatTime(fieldData.departureTime)}`;
        }
        if (
          item.subcategory === 'flight_arrival' &&
          'arrivalTime' in fieldData &&
          fieldData.arrivalTime
        ) {
          return `Arrive: ${formatTime(fieldData.arrivalTime)}`;
        }
        if (
          'departureTime' in fieldData &&
          'arrivalTime' in fieldData &&
          fieldData.departureTime &&
          fieldData.arrivalTime
        ) {
          return `${formatTime(fieldData.departureTime)} - ${formatTime(fieldData.arrivalTime)}`;
        }
        if ('departureTime' in fieldData && fieldData.departureTime) {
          return `Depart: ${formatTime(fieldData.departureTime)}`;
        }
        if ('arrivalTime' in fieldData && fieldData.arrivalTime) {
          return `Arrive: ${formatTime(fieldData.arrivalTime)}`;
        }
        break;
      case 'custom':
        if ('time' in fieldData && fieldData.time) {
          return formatTime(fieldData.time);
        }
        break;
    }
    return null;
  };

  const renderFieldDetails = () => {
    const fieldData = getFieldData();
    const details: string[] = [];

    // Show most relevant info based on item type (excluding times)
    switch (item.type) {
      case 'hotel':
        if ('location' in fieldData && fieldData.location) {
          details.push(fieldData.location);
        }
        break;

      case 'restaurant':
        if ('cuisine' in fieldData && fieldData.cuisine) {
          details.push(fieldData.cuisine);
        }
        if ('priceRange' in fieldData && fieldData.priceRange) {
          details.push(fieldData.priceRange);
        }
        if ('location' in fieldData && fieldData.location) {
          details.push(fieldData.location);
        }
        break;

      case 'activity':
        if ('duration' in fieldData && fieldData.duration) {
          details.push(fieldData.duration);
        }
        if ('location' in fieldData && fieldData.location) {
          details.push(fieldData.location);
        }
        break;

      case 'transport':
        if ('flightNumber' in fieldData && fieldData.flightNumber) {
          details.push(`#${fieldData.flightNumber}`);
        } else if (
          'transportNumber' in fieldData &&
          fieldData.transportNumber
        ) {
          details.push(`#${fieldData.transportNumber}`);
        }

        // For flights, show relevant info based on subcategory
        if (item.subcategory === 'flight_departure') {
          if ('departureAirport' in fieldData && fieldData.departureAirport) {
            details.push(`From: ${fieldData.departureAirport}`);
          }
        } else if (item.subcategory === 'flight_arrival') {
          if ('arrivalAirport' in fieldData && fieldData.arrivalAirport) {
            details.push(`To: ${fieldData.arrivalAirport}`);
          }
        } else {
          // For other transport types, show location info
          if ('departureLocation' in fieldData && fieldData.departureLocation) {
            details.push(`From: ${fieldData.departureLocation}`);
          }
          if ('arrivalLocation' in fieldData && fieldData.arrivalLocation) {
            details.push(`To: ${fieldData.arrivalLocation}`);
          }
        }
        break;

      case 'custom':
        if ('location' in fieldData && fieldData.location) {
          details.push(fieldData.location);
        }
        break;
    }

    return details.length > 0 ? details.join(' • ') : null;
  };

  const getItemIcon = () => {
    switch (item.type) {
      case 'hotel':
        return <HotelIcon />;
      case 'restaurant':
        return <RestaurantIcon />;
      case 'activity':
        return <ActivityIcon />;
      case 'transport':
        return <TransportIcon />;
      case 'custom':
        return <CustomIcon />;
      default:
        return <CustomIcon />;
    }
  };

  const renderTags = () => {
    if (!item.tags || !Array.isArray(item.tags) || item.tags.length === 0) {
      return null;
    }

    return (
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {item.tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            size="small"
            variant="outlined"
            sx={{
              fontSize: '0.75rem',
              height: '20px',
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />
        ))}
      </Stack>
    );
  };

  return (
    <>
      <Card
        sx={{
          p: 3,
          borderRadius: 2,
          borderLeft: `4px solid`,
          borderLeftColor: getItemTypeColor(item.type),
        }}
      >
        <Stack direction="row" spacing={3}>
          {/* Time Display - Left Side with Fixed Width */}
          <Box
            sx={{
              width: '120px', // Fixed width for consistency
              flexShrink: 0, // Prevent shrinking
              pt: 0.5,
            }}
          >
            {getTimeDisplay() && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  lineHeight: 1.4,
                }}
              >
                {getTimeDisplay()}
              </Typography>
            )}
          </Box>

          {/* Main Content */}
          <Stack spacing={2} sx={{ flex: 1 }}>
            {/* Header */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Stack spacing={1} sx={{ flex: 1 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {getItemIcon()}
                  </Box>
                  <Stack spacing={0.5} sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {item.name ||
                        `${item.type.charAt(0).toUpperCase() + item.type.slice(1)}`}
                    </Typography>
                    {item.name && (
                      <Typography variant="caption" color="text.secondary">
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </Typography>
                    )}
                  </Stack>

                  {item.subcategory && (
                    <Chip
                      label={
                        getSubcategoryLabel(item.type, item.subcategory) ||
                        item.subcategory
                      }
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: '0.75rem',
                        borderColor: getItemTypeColor(item.type),
                        color: getItemTypeColor(item.type),
                      }}
                    />
                  )}
                </Stack>

                {/* Tags */}
                {renderTags()}

                {/* Field details */}
                {renderFieldDetails() && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: '0.875rem' }}
                  >
                    {renderFieldDetails()}
                  </Typography>
                )}
              </Stack>
              <IconButton
                size="small"
                onClick={handleMenuOpen}
                sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}
              >
                <MoreVertIcon />
              </IconButton>
            </Stack>

            {/* Notes section */}
            {item.notes && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontStyle: 'italic' }}
              >
                {item.notes}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Card>

      {/* Item Options Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ color: 'error.main' }} />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default ItemCard;
