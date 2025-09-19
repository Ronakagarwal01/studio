
'use server';
/**
 * @fileOverview An AI agent that recommends Indian music based on a facial image.
 *
 * - recommendIndianMusic - A function that handles the music recommendation process.
 * - RecommendIndianMusicInput - The input type for the recommendIndianMusic function.
 * - RecommendIndianMusicOutput - The return type for the recommendIndianMusic function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendIndianMusicInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a person's face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type RecommendIndianMusicInput = z.infer<typeof RecommendIndianMusicInputSchema>;

const SongRecommendationSchema = z.object({
    title: z.string().describe("The title of the song."),
    artist: z.string().describe("The artist(s) of the song."),
});

const RecommendIndianMusicOutputSchema = z.object({
  recommendations: z.array(SongRecommendationSchema).describe("A list of 5-7 recommended Indian songs appropriate for relaxation and mental wellness."),
});
export type RecommendIndianMusicOutput = z.infer<typeof RecommendIndianMusicOutputSchema>;

export async function recommendIndianMusic(input: RecommendIndianMusicInput): Promise<RecommendIndianMusicOutput> {
  return recommendIndianMusicFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendIndianMusicPrompt',
  input: {schema: RecommendIndianMusicInputSchema},
  output: {schema: RecommendIndianMusicOutputSchema},
  prompt: `You are an AI music expert specializing in Indian music for mental wellness and relaxation.

Your task is to analyze the provided image. If a face is detected, you must recommend a list of 5 relaxing and calming Indian songs. The songs can be instrumental, classical, or modern lo-fi, but they must be from Indian artists or cinema.

For each song, provide the title and the artist.

If no face is detected or the image is unclear, return an empty list for the recommendations.

Photo: {{media url=photoDataUri}}`,
});

const recommendIndianMusicFlow = ai.defineFlow(
  {
    name: 'recommendIndianMusicFlow',
    inputSchema: RecommendIndianMusicInputSchema,
    outputSchema: RecommendIndianMusicOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
