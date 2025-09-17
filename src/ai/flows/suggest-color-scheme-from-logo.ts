'use server';
/**
 * @fileOverview This file defines a Genkit flow that suggests a color scheme based on an uploaded logo image.
 *
 * The flow takes a logo image as input and returns a suggested color scheme.
 * - suggestColorScheme - The function to call to generate a color scheme
 * - SuggestColorSchemeInput - The input type for suggestColorScheme
 * - SuggestColorSchemeOutput - The output type for suggestColorScheme
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestColorSchemeInputSchema = z.object({
  logoDataUri: z
    .string()
    .describe(
      'A logo image as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected description
    ),
});
export type SuggestColorSchemeInput = z.infer<typeof SuggestColorSchemeInputSchema>;

const SuggestColorSchemeOutputSchema = z.object({
  primaryColor: z.string().describe('The suggested primary color in hex format (e.g., #3F51B5).'),
  secondaryColor: z.string().describe('The suggested secondary color in hex format (e.g., #CF6679).'),
  backgroundColor: z.string().describe('The suggested background color in hex format (e.g., #F5F5F5).'),
  accentColor1: z.string().describe('A suggested accent color 1 in hex format'),
  accentColor2: z.string().describe('A suggested accent color 2 in hex format'),
});
export type SuggestColorSchemeOutput = z.infer<typeof SuggestColorSchemeOutputSchema>;

export async function suggestColorScheme(input: SuggestColorSchemeInput): Promise<SuggestColorSchemeOutput> {
  return suggestColorSchemeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestColorSchemePrompt',
  input: {schema: SuggestColorSchemeInputSchema},
  output: {schema: SuggestColorSchemeOutputSchema},
  prompt: `You are an expert branding consultant who is excellent with color theming.

  Based on the colors present in the provided logo, suggest a color scheme consisting of a primary color, secondary color, background color, and two accent colors.

  Return the colors in hex format.

  Logo: {{media url=logoDataUri}}
  `,
});

const suggestColorSchemeFlow = ai.defineFlow(
  {
    name: 'suggestColorSchemeFlow',
    inputSchema: SuggestColorSchemeInputSchema,
    outputSchema: SuggestColorSchemeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
