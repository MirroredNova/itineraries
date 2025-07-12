import TemplateEditor from '@/components/pages/templates/[id]/TemplateEditor';
import { getTemplateByIdAction } from '@/server/actions/template.actions';
import React from 'react';

type Props = {
  params: Promise<{ id: string }>;
};

const TemplatePage = async ({ params }: Props) => {
  const idNum = parseInt((await params).id, 10);
  const template = await getTemplateByIdAction(idNum);

  return <TemplateEditor initialTemplate={template} />;
};

export default TemplatePage;
