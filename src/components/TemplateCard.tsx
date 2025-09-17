import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Template } from '@/lib/templates';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === template.id);

  return (
    <Link href={`/editor/${template.id}`} className="group block">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="aspect-[3/2] relative overflow-hidden border-b">
          {placeholder && (
            <Image
              src={placeholder.imageUrl}
              alt={template.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={placeholder.imageHint}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
        <CardHeader>
          <CardTitle className="font-headline text-xl">{template.name}</CardTitle>
          <CardDescription className="mt-2 text-base">{template.description}</CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto">
          <div className="flex justify-end w-full">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Customize
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
