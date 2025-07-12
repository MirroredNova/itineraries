import { getAllTemplatesAction } from '@/server/actions/template.actions';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import CreateButton from './CreateButton';
import Link from 'next/link';

const TemplatesList = async () => {
  const templates = await getAllTemplatesAction();

  return (
    <Stack spacing={2} direction="column">
      <Box>
        <Typography variant="h4">Templates</Typography>
        <CreateButton />
      </Box>
      <List>
        {templates.map((template) => (
          <ListItem key={template.id}>
            <Link href={`/templates/${template.id}`}>
              {`${template.name} - ${template.id} - ${template.createdAt}`}
            </Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default TemplatesList;
