'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';
import { getAiColorScheme } from '@/app/editor/[templateId]/actions';
import type { SuggestColorSchemeOutput } from '@/ai/flows/suggest-color-scheme-from-logo';
import type { TemplateTheme } from '@/lib/templates';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface ThemeCustomizerProps {
  currentTheme: TemplateTheme;
  onThemeChange: (newTheme: TemplateTheme) => void;
}

export function ThemeCustomizer({ currentTheme, onThemeChange }: ThemeCustomizerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedScheme, setSuggestedScheme] = useState<SuggestColorSchemeOutput | null>(null);
  const { toast } = useToast();

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setSuggestedScheme(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const logoDataUri = reader.result as string;
      try {
        const result = await getAiColorScheme({ logoDataUri });
        setSuggestedScheme(result);
        toast({
          title: 'Color Scheme Suggested!',
          description: 'Apply the new theme or upload another logo.',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error Generating Theme',
          description: error instanceof Error ? error.message : 'An unknown error occurred.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      toast({
        variant: 'destructive',
        title: 'Error Reading File',
        description: 'Could not read the uploaded logo file.',
      });
      setIsLoading(false);
    };
  };

  const applyColorScheme = (scheme: SuggestColorSchemeOutput) => {
    onThemeChange({
      ...currentTheme,
      primaryColor: scheme.primaryColor,
      secondaryColor: scheme.secondaryColor,
      backgroundColor: scheme.backgroundColor,
      accentColor1: scheme.accentColor1,
      accentColor2: scheme.accentColor2,
      textColor: isDark(scheme.backgroundColor) ? '#FFFFFF' : '#111111',
    });
    toast({ title: 'Theme Applied!', description: 'The new color scheme has been applied to your template.' });
  };
  
  const isDark = (hexColor: string) => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'><Wand2 className='text-primary'/> AI Theme Generator</CardTitle>
        <CardDescription>Upload your logo to generate a custom color palette.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="logo-upload">Upload Logo</Label>
          <Input id="logo-upload" type="file" accept="image/*" onChange={handleLogoUpload} disabled={isLoading} />
        </div>

        {isLoading && (
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating theme...
          </div>
        )}

        {suggestedScheme && (
          <div className="space-y-4">
            <h4 className="font-semibold">Suggested Colors:</h4>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(suggestedScheme).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="w-full h-12 rounded-md border" style={{ backgroundColor: value }}></div>
                  <p className="text-xs mt-1 capitalize">{key.replace('Color', ' Color')}</p>
                </div>
              ))}
            </div>
            <Button className="w-full" onClick={() => applyColorScheme(suggestedScheme)}>
              Apply Theme
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
