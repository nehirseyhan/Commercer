'use client';

import { useState, useCallback, useMemo } from 'react';
import type { Template, TemplateContent, TemplateTheme } from '@/lib/templates';
import { Header } from '@/components/Header';
import { ThemeCustomizer } from '@/components/editor/ThemeCustomizer';
import { LivePreview } from '@/components/editor/LivePreview';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { downloadHtml } from '@/lib/download';
import { Separator } from '@/components/ui/separator';

export function EditorClient({ template }: { template: Template }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [theme, setTheme] = useState<TemplateTheme>({
    ...template.initialTheme,
    headlineFont: 'Playfair Display',
    bodyFont: 'PT Sans',
  });
  const [content, setContent] = useState<TemplateContent>(template.initialContent);

  const handleContentChange = useCallback((id: string, value: string) => {
    setContent((prevContent) => ({ ...prevContent, [id]: value }));
  }, []);

  const fullHtml = useMemo(() => {
    const finalCss = template.css(theme);
    const finalHtml = template.html(content);
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${content.nav_brand || content.headline || 'My Website'}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
        <style>${finalCss}</style>
      </head>
      <body>
        ${finalHtml}
      </body>
      </html>
    `;
  }, [theme, content, template]);

  const handleDownload = () => {
    setIsDownloading(true);
    downloadHtml(fullHtml, 'index.html');
    setTimeout(() => setIsDownloading(false), 1000);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header>
        <Button onClick={handleDownload} disabled={isDownloading}>
          {isDownloading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          Download
        </Button>
      </Header>
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[380px_1fr] overflow-hidden">
        <aside className="lg:border-r overflow-y-auto p-4 md:p-6">
          <h2 className="text-2xl font-headline font-bold">Customize</h2>
          <p className="text-muted-foreground mb-4">
            Use AI to generate a theme or manually adjust the content.
          </p>
          <Separator className="mb-6"/>
          <ThemeCustomizer currentTheme={theme} onThemeChange={setTheme} />
        </aside>
        <main className="bg-muted/30 overflow-hidden">
          <LivePreview
            template={template}
            theme={theme}
            content={content}
            onContentChange={handleContentChange}
          />
        </main>
      </div>
    </div>
  );
}
