'use client';

import { Box, Modal, Typography, Button, Stack } from '@mui/material';

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  submitText?: string;
  onSubmit?: () => void;
  submitDisabled?: boolean;
  cancelText?: string;
  maxWidth?: number | string;
}

const BaseModal = ({
  open,
  onClose,
  title,
  description,
  children,
  submitText,
  onSubmit,
  submitDisabled = false,
  cancelText = 'Cancel',
  maxWidth = 400,
}: BaseModalProps) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="base-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: maxWidth },
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" component="h2" gutterBottom>
              {title}
            </Typography>
            {description && (
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            )}
          </Box>

          {children}

          {(submitText || cancelText) && (
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={onClose}>
                {cancelText}
              </Button>
              {submitText && onSubmit && (
                <Button
                  variant="contained"
                  onClick={onSubmit}
                  disabled={submitDisabled}
                >
                  {submitText}
                </Button>
              )}
            </Stack>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};

export default BaseModal;
