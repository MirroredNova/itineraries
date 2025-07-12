'use client';

import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { createTemplateAction } from '@/server/actions/template.actions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
};

const CreateButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Create Template
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Card sx={style} component="form" action={createTemplateAction}>
          <Typography variant="h6" component="h2">
            Create New Template
          </Typography>
          <Typography sx={{ mt: 2 }}>
            You are about to create a new template. What is the name of your
            template?
          </Typography>
          <TextField
            size="small"
            fullWidth
            sx={{ mt: 2 }}
            placeholder="Template Name"
            name="name"
            defaultValue="My Template"
          />
          <Typography sx={{ mt: 2 }}>How many days is your trip?</Typography>
          <TextField
            type="number"
            size="small"
            fullWidth
            sx={{ mt: 2 }}
            placeholder="Days"
            defaultValue={1}
            name="numdays"
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Create
          </Button>
        </Card>
      </Modal>
    </>
  );
};

export default CreateButton;
