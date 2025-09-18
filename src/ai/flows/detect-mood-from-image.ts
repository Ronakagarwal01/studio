
'use server';
/**
 * @fileOverview An AI agent that detects mood from a facial image and provides recommendations.
 *
 * - detectMoodFromImage - A function that handles the mood detection process.
 * - DetectMoodFromImageInput - The input type for the detectMoodFromImage function.
 * - DetectMoodFromImageOutput - The return type for the detectMoodFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectMoodFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a person's face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DetectMoodFromImageInput = z.infer<typeof DetectMoodFromImageInputSchema>;

const DetectMoodFromImageOutputSchema = z.object({
  mood: z.string().describe("The detected mood of the person in the photo (e.g., Happy, Sad, Anxious, Calm, Energetic)."),
  recommendations: z.string().describe("A few short, actionable recommendations based on the detected mood. For example, if the mood is sad, suggest a short breathing exercise or listening to an uplifting song."),
});
export type DetectMoodFromImageOutput = z.infer<typeof DetectMoodFromImageOutputSchema>;

export async function detectMoodFromImage(input: DetectMoodFromImageInput): Promise<DetectMoodFromImageOutput> {
  return detectMoodFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectMoodFromImagePrompt',
  input: {schema: DetectMoodFromImageInputSchema},
  output: {schema: DetectMoodFromImageOutputSchema},
  prompt: `You are a friendly and empathetic AI wellness assistant. Your task is to analyze the provided image to determine the person's mood based on their facial expression.

Analyze the image and identify the predominant mood.

Based on the detected mood, provide 4-5 simple, positive, and actionable recommendations. The recommendations should be things the user can do right now to either maintain a positive mood or improve a negative one.

If no face is detected, respond with a friendly message asking the user to try again with a clear photo of their face. In that case, set the mood to "Unknown".

Photo: {{media url=photoDataUri}}`,
});

const detectMoodFromImageFlow = ai.defineFlow(
  {
    name: 'detectMoodFromImageFlow',
    inputSchema: DetectMoodFromImageInputSchema,
    outputSchema: DetectMoodFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
