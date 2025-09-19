
'use server';

import { providePersonalizedRecommendations } from '@/ai/flows/provide-personalized-recommendations';
import { generateTailoredJournalPrompts } from '@/ai/flows/generate-tailored-journal-prompts';
import { detectMoodFromImage } from '@/ai/flows/detect-mood-from-image';
import { generateAudioFromText } from '@/ai/flows/generate-audio-from-text';
import { recommendIndianMusic, RecommendIndianMusicOutput } from '@/ai/flows/recommend-indian-music';
import { getSpotifyTrack } from '@/ai/flows/get-spotify-track';
import { generateTestInterpretation } from '@/ai/flows/generate-test-interpretation';


export { providePersonalizedRecommendations, generateTailoredJournalPrompts, detectMoodFromImage, generateAudioFromText, recommendIndianMusic, getSpotifyTrack, generateTestInterpretation };
export type { RecommendIndianMusicOutput };
