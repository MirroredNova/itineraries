import { getAllTemplatesAction } from '@/server/actions/template.actions';
import { Box, Card, Stack, Typography } from '@mui/material';
import CreateButton from './CreateButton';
import TemplateCard from './TemplateCard';

const TemplatesList = async () => {
  const templates = await getAllTemplatesAction();

  return (
    <Stack spacing={5}>
      {/* Header */}
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
              Templates
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Create and manage your itinerary templates
            </Typography>
          </Box>
          <CreateButton />
        </Stack>
      </Box>

      {/* Templates List */}
      {templates.length === 0 ? (
        <Card
          sx={{
            p: 6,
            textAlign: 'center',
            backgroundColor: 'background.default',
            border: '2px dashed',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No templates yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Create your first template to get started
          </Typography>
          <CreateButton />
        </Card>
      ) : (
        <Stack spacing={3}>
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default TemplatesList;
