
'use server';
/**
 * @fileOverview Generates a personalized and empathetic interpretation of a mental health self-assessment score.
 *
 * - generateTestInterpretation - A function that generates the interpretation message.
 * - GenerateTestInterpretationInput - The input type for the generateTestInterpretation function.
 * - GenerateTestInterpretationOutput - The return type for the generateTestInterpretation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTestInterpretationInputSchema = z.object({
  testTitle: z.string().describe("The title of the test taken, e.g., 'Depression Test (PHQ-9)' or 'Anxiety Test (GAD-7)'."),
  score: z.number().describe('The final score from the test.'),
  interpretation: z.object({
      level: z.string(),
      message: z.string(),
  }).describe('The pre-defined interpretation text for the given score.')
});
export type GenerateTestInterpretationInput = z.infer<typeof GenerateTestInterpretationInputSchema>;

const GenerateTestInterpretationOutputSchema = z.object({
  recommendation: z.string().describe('A personalized, empathetic, and friendly recommendation written in Hinglish (a mix of Hindi and English).'),
});
export type GenerateTestInterpretationOutput = z.infer<typeof GenerateTestInterpretationOutputSchema>;

export async function generateTestInterpretation(input: GenerateTestInterpretationInput): Promise<GenerateTestInterpretationOutput> {
  return generateTestInterpretationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTestInterpretationPrompt',
  input: {schema: GenerateTestInterpretationInputSchema},
  output: {schema: GenerateTestInterpretationOutputSchema},
  prompt: `You are an empathetic and friendly AI wellness coach. Your goal is to provide a warm, supportive, and non-clinical recommendation to a user who has just completed a mental health self-assessment.

The user's language is Hinglish (a mix of Hindi and English). Respond in a very caring, gentle, and friendly tone.

Here is the user's test information:
- Test: {{{testTitle}}}
- Score: {{{score}}}
- Standard Interpretation: Your score suggests {{{interpretation.level}}}. {{{interpretation.message}}}

Based on this information, please generate a personalized recommendation. Follow these instructions:
1.  **Tone:** Be very gentle and friendly, like a close friend. Avoid clinical or scary language. Use encouraging and positive words.
2.  **Language:** Write in Hinglish. Use simple Hindi words where they feel natural. For example: "Aapka score..." or "Thoda stress feel ho raha hai, koi baat nahi."
3.  **Content:**
    - Acknowledge their score in a gentle way.
    - Reassure them that it's okay to feel this way and that taking the test was a good step.
    - Based on their interpretation level (e.g., Mild, Moderate, Severe), provide one or two simple, actionable suggestions. For lower scores, suggest things like a breathing exercise or talking to a friend. For higher scores, gently suggest that talking to a professional might be a helpful idea, framing it as a positive step for self-care.
    - End on a hopeful and supportive note.

Example for a moderate score: "Hey, thanks for trusting me with this. Aapka score {{{score}}} hai, aur aisa lagta hai ki aap thoda zyada stress mehsoos kar rahe hain. Yeh bilkul theek hai, aur aap akele nahi hain. Kabhi kabhi hum sabko thodi help ki zaroorat hoti hai. Shayad ek choti si breathing exercise try kar sakte hain? Ya kisi dost se baat karke mann halka ho jayega. Aur yaad rakhein, professional se baat karna bhi ek himmat wala kadam hota hai apan ko behtar feel karane ke liye. Aap important hain!"
`,
});

const generateTestInterpretationFlow = ai.defineFlow(
  {
    name: 'generateTestInterpretationFlow',
    inputSchema: GenerateTestInterpretationInputSchema,
    outputSchema: GenerateTestInterpretationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
