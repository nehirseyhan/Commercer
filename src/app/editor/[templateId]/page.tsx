import { templates } from '@/lib/templates';
import { EditorClient } from '@/components/editor/EditorClient';
import { notFound } from 'next/navigation';

export default function EditorPage({ params }: { params: { templateId: string } }) {
  const template = templates.find(t => t.id === params.templateId);

  if (!template) {
    notFound();
  }

  return <EditorClient template={template} />;
}
