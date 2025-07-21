'use client';

import { deleteTemplateAction } from '@/server/actions/template.actions';
import {
  Card,
  Stack,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { TemplateTableType } from '@/types/schemas.types';
import { useState } from 'react';
import Link from 'next/link';

interface TemplateCardProps {
  template: TemplateTableType;
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteTemplateAction(template.id);
    } catch (error) {
      console.error('Failed to delete template:', error);
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Card sx={{ width: '100%' }}>
        <Link
          href={`/templates/${template.id}`}
          style={{ textDecoration: 'none' }}
        >
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {template.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Created {new Date(template.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              <IconButton
                onClick={handleDeleteClick}
                sx={{
                  opacity: 0.7,
                  '&:hover': { opacity: 1, color: 'error.main' },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Link>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete &quot;{template.name}&quot;? This
            action cannot be undone and will permanently remove all days,
            groups, and items in this template.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TemplateCard;
