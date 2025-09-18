'use server';

import { providePersonalizedRecommendations } from '@/ai/flows/provide-personalized-recommendations';
import { generateTailoredJournalPrompts } from '@/ai/flows/generate-tailored-journal-prompts';
import { detectMoodFromImage } from '@/ai/flows/detect-mood-from-image';
import { generateAudioFromText } from '@/ai/flows/generate-audio-from-text';

export { providePersonalizedRecommendations, generateTailoredJournalPrompts, detectMoodFromImage, generateAudioFromText };
