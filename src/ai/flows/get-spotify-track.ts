
'use server';
/**
 * @fileOverview A flow to search for a track on Spotify.
 *
 * - getSpotifyTrack - A function that searches for a track and returns its details.
 * - GetSpotifyTrackInput - The input type for the getSpotifyTrack function.
 * - GetSpotifyTrackOutput - The return type for the getSpotifyTrack function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { searchTrack } from '@/lib/spotify';

const GetSpotifyTrackInputSchema = z.object({
    title: z.string(),
    artist: z.string(),
});
export type GetSpotifyTrackInput = z.infer<typeof GetSpotifyTrackInputSchema>;

const GetSpotifyTrackOutputSchema = z.object({
    uri: z.string().optional(),
    name: z.string().optional(),
    artist: z.string().optional(),
});
export type GetSpotifyTrackOutput = z.infer<typeof GetSpotifyTrackOutputSchema>;

export async function getSpotifyTrack(input: GetSpotifyTrackInput): Promise<GetSpotifyTrackOutput> {
    const track = await searchTrack(`${input.title} ${input.artist}`);
    if (track) {
        return {
            uri: track.uri,
            name: track.name,
            artist: track.artists.map((a: any) => a.name).join(', '),
        };
    }
    return {};
}

ai.defineFlow(
    {
      name: 'getSpotifyTrackFlow',
      inputSchema: GetSpotifyTrackInputSchema,
      outputSchema: GetSpotifyTrackOutputSchema,
    },
    async (input) => {
      return getSpotifyTrack(input);
    }
);
