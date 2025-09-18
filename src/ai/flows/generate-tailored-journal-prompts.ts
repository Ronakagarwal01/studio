'use server';
/**
 * @fileOverview Generates tailored journaling prompts based on user-selected themes.
 *
 * - generateTailoredJournalPrompts - A function that generates personalized journaling prompts.
 * - GenerateTailoredJournalPromptsInput - The input type for the generateTailoredJournalPrompts function.
 * - GenerateTailoredJournalPromptsOutput - The return type for the generateTailoredJournalPrompts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTailoredJournalPromptsInputSchema = z.object({
  theme: z
    .string()
    .describe('The theme for the journaling prompt, e.g., gratitude, self-discovery, etc.'),
});
export type GenerateTailoredJournalPromptsInput = z.infer<typeof GenerateTailoredJournalPromptsInputSchema>;

const GenerateTailoredJournalPromptsOutputSchema = z.object({
  prompt: z.string().describe('A personalized journaling prompt based on the selected theme.'),
});
export type GenerateTailoredJournalPromptsOutput = z.infer<typeof GenerateTailoredJournalPromptsOutputSchema>;

export async function generateTailoredJournalPrompts(input: GenerateTailoredJournalPromptsInput): Promise<GenerateTailoredJournalPromptsOutput> {
  return generateTailoredJournalPromptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTailoredJournalPromptsPrompt',
  input: {schema: GenerateTailoredJournalPromptsInputSchema},
  output: {schema: GenerateTailoredJournalPromptsOutputSchema},
  prompt: `You are an AI journaling assistant. Generate a unique and thought-provoking journaling prompt based on the following theme:

Theme: {{{theme}}}

Prompt:`,
});

const generateTailoredJournalPromptsFlow = ai.defineFlow(
  {
    name: 'generateTailoredJournalPromptsFlow',
    inputSchema: GenerateTailoredJournalPromptsInputSchema,
    outputSchema: GenerateTailoredJournalPromptsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
