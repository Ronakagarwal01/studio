import { Headphones, Wind, Leaf, UserCheck, Users, Phone } from "lucide-react";

export const relaxationExercises = [
  {
    id: 'deep-breathing',
    title: 'Deep Breathing',
    description: 'A 5-minute guided session to calm your mind and body through controlled breathing.',
    icon: Wind,
    duration: '5 min',
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
          name: "Vandrevala Foundation Helpline",
          specialty: "24/7 free and confidential support for mental health.",
          location: "India",
          contact: "Call 9999666555",
          icon: Phone
      },
      {
          id: 5,
          name: "KIRAN Mental Health Helpline",
          specialty: "A national helpline by the Government of India.",
          location: "India",
          contact: "Call 1800-599-0019",
          icon: Phone
      },
      {
          id: 6,
          name: "iCALL Psychosocial Helpline",
          specialty: "Provides counselling by phone from TISS.",
          location: "India",
          contact: "Call 9152987821",
          icon: Phone
      }
  ]
};

export const symptomCheckerQuestions = [
  {
    question: 'Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'How often have you been bothered by feeling down, depressed, or hopeless?',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'How often have you been bothered by feeling nervous, anxious, or on edge?',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
  {
    question: 'How often have you been bothered by not being able to stop or control worrying?',
    options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
  },
];
