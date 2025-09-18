'use server';

import { providePersonalizedRecommendations } from '@/ai/flows/provide-personalized-recommendations';
import { generateTailoredJournalPrompts } from '@/ai/flows/generate-tailored-journal-prompts';
import { detectMoodFromImage } from '@/ai/flows/detect-mood-from-image';

export { providePersonalizedRecommendations, generateTailoredJournalPrompts, detectMoodFromImage };
