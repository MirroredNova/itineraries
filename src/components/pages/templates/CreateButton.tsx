'use client';

import { useState } from 'react';
import {
  Button,
  Card,
  Modal,
  Typography,
  TextField,
  Stack,
  Box,
} from '@mui/material';
import { createTemplateAction } from '@/server/actions/template.actions';

const CreateButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ minWidth: 160 }}
      >
        Create Template
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="create-template-modal"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 500 },
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            p: 5,
          }}
        >
          <Card
            component="form"
            action={createTemplateAction}
            sx={{ p: 0, boxShadow: 'none' }}
          >
            <Stack spacing={4}>
              <Box>
                <Typography
                  variant="h4"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  Create New Template
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Start building your itinerary template
                </Typography>
              </Box>

              <Stack spacing={3}>
                <TextField
                  placeholder="Template Name"
                  name="name"
                  defaultValue="My Template"
                  required
                  size="medium"
                  label="Template Name"
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={() => setOpen(false)}
                  sx={{ flex: 1 }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" sx={{ flex: 1 }}>
                  Create Template
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Box>
      </Modal>
    </>
  );
};

export default CreateButton;
