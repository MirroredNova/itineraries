import TemplateEditor from '@/components/pages/templates/[id]/TemplateEditor';
import { getTemplateByIdAction } from '@/server/actions/template.actions';
import { Box } from '@mui/material';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

const TemplatePage = async ({ params }: Props) => {
  try {
    const idNum = parseInt((await params).id, 10);
    const template = await getTemplateByIdAction(idNum);

    return (
      <Box sx={{ py: 2 }}>
        <TemplateEditor initialTemplate={template} />
      </Box>
    );
  } catch {
    notFound();
  }
};

export default TemplatePage;
