'use client';

import {
  updateTemplateAction,
  deleteTemplateAction,
} from '@/server/actions/template.actions';
import {
  TextField,
  Stack,
  Box,
  Typography,
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { TemplateTableType } from '@/types/schemas.types';
import { useState, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import DayList from './DayList';

interface Props {
  initialTemplate: TemplateTableType;
}

const TemplateEditor = ({ initialTemplate }: Props) => {
  const [templateName, setTemplateName] = useState(initialTemplate.name || '');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const debouncedSave = useDebouncedCallback(
    async (name: string) => {
      if (name.trim() && name !== initialTemplate.name) {
        try {
          const formData = new FormData();
          formData.append('id', initialTemplate.id.toString());
          formData.append('name', name.trim());
          await updateTemplateAction(formData);
        } catch {
          // Handle error silently or show user feedback
        }
      }
    },
    1000, // 1 second delay
  );

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newName = event.target.value;
      setTemplateName(newName);
      debouncedSave(newName);
    },
    [debouncedSave],
  );

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteTemplateAction(initialTemplate.id);
    } catch {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Stack spacing={5}>
        {/* Template Header */}
        <Card>
          <Stack spacing={4}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Box>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                  Edit Template
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Template #{initialTemplate.id} • Created{' '}
                  {new Date(initialTemplate.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteClick}
                sx={{ minWidth: 'auto' }}
              >
                Delete
              </Button>
            </Box>

            <TextField
              label="Template Name"
              value={templateName}
              onChange={handleNameChange}
              placeholder="Enter template name"
            />
          </Stack>
        </Card>

        {/* Template Structure */}
        <Card>
          <Stack spacing={4}>
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Template Structure
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                Organize your itinerary by days. Add items like hotels,
                restaurants, activities, and transportation. Use tags to
                categorize and filter your items.
              </Typography>
            </Box>

            <Box>
              <DayList templateId={initialTemplate.id} />
            </Box>
          </Stack>
        </Card>
      </Stack>

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
            Are you sure you want to delete&nbsp; &quot;
            {templateName || initialTemplate.name}&quot;? This action cannot be
            undone and will permanently remove all days and items in this
            template.
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

export default TemplateEditor;
