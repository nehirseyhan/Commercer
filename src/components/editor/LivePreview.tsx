'use client';

import { useEffect, useMemo, useRef } from 'react';
import type { Template, TemplateContent, TemplateTheme } from '@/lib/templates';
import { Skeleton } from '../ui/skeleton';

interface LivePreviewProps {
  template: Template;
  theme: TemplateTheme;
  content: TemplateContent;
  onContentChange: (id: string, value: string) => void;
}

export function LivePreview({ template, theme, content, onContentChange }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      // Expose the callback to the iframe's window object
      (iframeRef.current.contentWindow as any).handleContentChange = onContentChange;
    }
  }, [onContentChange]);

  const srcDoc = useMemo(() => {
    const finalCss = template.css(theme);
    const finalHtml = template.html(content);

    const script = `
      document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-editable-id]').forEach(el => {
          el.setAttribute('contenteditable', 'true');
          el.setAttribute('spellcheck', 'false');
          el.style.outline = 'none';

          el.addEventListener('focus', () => {
            el.style.boxShadow = '0 0 0 2px hsl(var(--ring))';
            el.style.borderRadius = '3px';
          });
          el.addEventListener('blur', (e) => {
            el.style.boxShadow = 'none';
            if (window.parent && typeof window.parent.handleContentChange === 'function') {
                window.parent.handleContentChange(el.dataset.editableId, e.target.innerText);
            }
          });
        });
      });
    `;

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
        <style>
            ${finalCss}
            /* Add styles for focus state on editable elements */
            [data-editable-id]:focus {
                outline: 2px solid ${theme.primaryColor};
                border-radius: 3px;
                box-shadow: 0 0 5px ${theme.primaryColor};
            }
            [data-editable-id]:hover {
                cursor: text;
            }
        </style>
        <script>${script}</script>
      </head>
      <body>
        ${finalHtml}
      </body>
      </html>
    `;
  }, [template, theme, content]);
  
  if (typeof window === 'undefined') {
    return <Skeleton className="w-full h-full" />;
  }

  return (
    <div className="w-full h-full p-4">
       <iframe
          ref={iframeRef}
          srcDoc={srcDoc}
          title="Live Preview"
          className="w-full h-full border-2 border-border bg-white rounded-lg shadow-inner"
          sandbox="allow-scripts allow-same-origin"
       />
    </div>
  );
}
