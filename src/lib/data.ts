import { Headphones, Wind, Leaf, UserCheck, Users, Phone, Brain, Book, StretchVertical, Gamepad2 } from "lucide-react";

export const relaxationExercises = [
  {
    id: 'deep-breathing',
    title: 'Breathing Exercises (साँस की कसरत)',
    description: `Box Breathing (4-4-4-4 method): Inhale for 4s, hold for 4s, exhale for 4s, hold for 4s. Repeat 5-10 rounds. Useful for anxiety and stress.
Alternate Nostril Breathing (Anulom Vilom): Inhale through one nostril, exhale through the other. Relaxes the nervous system.
Online recommendations: Guided breathing YouTube videos or mobile apps (Calm, Headspace, Medito).`,
    icon: Wind,
    duration: '5-10 min',
    image: { id: "1", hint: "calm water" }
  },
  {
    id: 'body-scan-meditation',
    title: 'Body Scan Meditation',
    description: 'Bring awareness to every part of your body and release tension in this 10-minute exercise.',
    icon: Leaf,
    duration: '10 min',
    image: { id: "2", hint: "forest path" }
  },
    {
    id: 'mindfulness-meditation',
    title: 'Mindfulness Meditation',
    description: `Focus only on the present moment (on your breath or environment). Guided meditation apps (Headspace, Insight Timer, Calm). Even 5-10 minutes can relax the mind.
Recommendation: "Headspace Basics – 10 days meditation program".`,
    icon: Brain,
    duration: '5-10 min',
    image: { id: "4", hint: "serene landscape" }
  },
  {
    id: 'journaling',
    title: 'Journaling (Likhnā)',
    description: `Writing down your thoughts and feelings releases stress. "Gratitude Journal" - write down three things you are thankful for in a day.
Online: Google Docs or journaling apps (Daylio, Journey).`,
    icon: Book,
    duration: '15 min',
    image: { id: "5", hint: "writing desk" }
  },
  {
    id: 'light-physical-exercise',
    title: 'Light Physical Exercise',
    description: `Stretching, Yoga poses (child pose, cat-cow, forward bend). A short walk (if possible).
Online yoga classes or YouTube tutorials (Yoga with Adriene).`,
    icon: StretchVertical,
    duration: '15 min',
    image: { id: "6", hint: "yoga sunrise" }
  },
    {
    id: 'positive-engagement',
    title: 'Distraction & Positive Engagement',
    description: `Short casual games (like puzzle or coloring apps). Creative activities: drawing, digital painting.
Online: Colorfy (coloring app), Elevate (mind games).`,
    icon: Gamepad2,
    duration: '10-15 min',
    image: { id: "7", hint: "puzzle pieces" }
  },
  {
    id: 'ambient-sounds',
    title: 'Calming Ambient Sounds',
    description: 'Listen to the soothing sounds of nature to relax and de-stress.',
    icon: Headphones,
    duration: '15 min',
    image: { id: "3", hint: "rain window" }
  },
];

export const resourceCategories = {
    therapists: "Therapists",
    supportGroups: "Support Groups",
    hotlines: "Emergency Helplines",
};

export const resources = {
  therapists: [
    {
      id: 1,
      name: 'Dr. Evelyn Reed',
      specialty: 'Cognitive Behavioral Therapy (CBT)',
      location: 'New York, NY (Online Available)',
      contact: 'Book a session',
      icon: UserCheck
    },
    {
      id: 2,
      name: 'Marcus Thorne, LCSW',
      specialty: 'Anxiety & Stress Management',
      location: 'San Francisco, CA (Online Available)',
      contact: 'Book a session',
      icon: UserCheck
    },
  ],
  supportGroups: [
    {
      id: 3,
      name: 'Mindful Living Community',
      specialty: 'Weekly mindfulness and meditation group',
      location: 'Online via Zoom',
      contact: 'Join group',
      icon: Users
    },
  ],
  hotlines: [
      {
          id: 4,
          name: "Tele-MANAS",
          specialty: "24/7 tele-counselling, crisis intervention, mental health awareness, and referrals to professionals.",
          location: "India",
          contact: "14416 / 1800-89-14416",
          icon: Phone
      },
      {
          id: 5,
          name: "KIRAN",
          specialty: "Mental health rehabilitation helpline (now integrated into Tele-MANAS).",
          location: "India",
          contact: "1800-599-0019",
          icon: Phone
      },
      {
          id: 6,
          name: "National Free Drug De-addiction Helpline",
          specialty: "Support and rehabilitation for drug addiction.",
          location: "India",
          contact: "1800-11-0031",
          icon: Phone
      },
      {
          id: 7,
          name: "Tobacco Quit Helpline",
          specialty: "Assistance with quitting tobacco.",
          location: "India",
          contact: "1800-11-2356",
          icon: Phone
      },
      {
          id: 8,
          name: "Vandrevala Foundation Helpline",
          specialty: "24/7 free and confidential support for mental health.",
          location: "India",
          contact: "9999666555",
          icon: Phone
      },
      {
          id: 9,
          name: "iCALL Psychosocial Helpline",
          specialty: "Provides counselling by phone from TISS.",
          location: "India",
          contact: "9152987821",
          icon: Phone
      }
  ]
};

const phq9Questions = [
  {
    question: 'Little interest or pleasure in doing things',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'Feeling down, depressed, or hopeless',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'Trouble falling or staying asleep, or sleeping too much',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'Feeling tired or having little energy',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'Poor appetite or overeating',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'Trouble concentrating on things, such as reading the newspaper or watching television',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'Thoughts that you would be better off dead or of hurting yourself in some way',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
];

const gad7Questions = [
    {
      question: 'Feeling nervous, anxious, or on edge',
      options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
    },
    {
      question: 'Not being able to stop or control worrying',
      options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
    },
    {
      question: 'Worrying too much about different things',
      options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
    },
    {
      question: 'Trouble relaxing',
      options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
    },
    {
      question: 'Being so restless that it\'s hard to sit still',
      options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
    },
    {
      question: 'Becoming easily annoyed or irritable',
      options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
    },
    {
      question: 'Feeling afraid as if something awful might happen',
      options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
    },
];

export const symptomCheckers = {
    'phq-9': {
        title: 'Depression Test (PHQ-9)',
        prompt: 'Over the last 2 weeks, how often have you been bothered by any of the following problems?',
        questions: phq9Questions,
        getScoreInterpretation: (finalScore: number) => {
            if (finalScore <= 4) return { level: 'Minimal', message: 'Your score suggests minimal to no depression symptoms. It\'s still a good practice to monitor your mood.' };
            if (finalScore <= 9) return { level: 'Mild', message: 'Your responses suggest you may be experiencing mild depression. Consider discussing your feelings with someone you trust or a professional.' };
            if (finalScore <= 14) return { level: 'Moderate', message: 'Your score indicates moderate depression symptoms. It is highly recommended to consult with a mental health professional.' };
            if (finalScore <= 19) return { level: 'Moderately Severe', message: 'Your responses suggest moderately severe depression. Professional help is very important. Please seek support.' };
            return { level: 'Severe', message: 'Your score indicates severe depression. It is crucial to seek professional help immediately.' };
        }
    },
    'gad-7': {
        title: 'Anxiety Test (GAD-7)',
        prompt: 'Over the last 2 weeks, how often have you been bothered by any of the following problems?',
        questions: gad7Questions,
        getScoreInterpretation: (finalScore: number) => {
            if (finalScore <= 4) return { level: 'Minimal Anxiety', message: 'Your score suggests minimal to no anxiety. Continue to practice self-care and monitor your feelings.' };
            if (finalScore <= 9) return { level: 'Mild Anxiety', message: 'Your responses suggest you may be experiencing mild anxiety. Consider incorporating relaxation techniques into your routine and talking to someone you trust.' };
            if (finalScore <= 14) return { level: 'Moderate Anxiety', message: 'Your score indicates moderate anxiety. It is highly recommended to consult with a mental health professional for further evaluation and support.' };
            return { level: 'Severe Anxiety', message: 'Your score indicates severe anxiety. It is crucial to seek professional help immediately to manage your symptoms.' };
        }
    }
}
