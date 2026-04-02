export type DisabilityType = "blindness" | "deafness" | "dyslexia" | "speech_disability";

export interface SurveyQuestion {
  id: string;
  question: string;
  description?: string;
  options: {
    label: string;
    value: number;
  }[];
}

export interface SurveyData {
  type: DisabilityType;
  title: string;
  description: string;
  ageRange: string;
  questions: SurveyQuestion[];
}

const frequencyOptions = [
  { label: "Never", value: 0 },
  { label: "Sometimes", value: 1 },
  { label: "Always", value: 2 },
];

const yesNoOptions = [
  { label: "No", value: 0 },
  { label: "Sometimes", value: 1 },
  { label: "Yes", value: 2 },
];

export const surveyData: Record<DisabilityType, SurveyData> = {
  blindness: {
    type: "blindness",
    title: "Vision Screening Survey",
    description: "This survey helps identify potential visual impairment signs in children. It is not a diagnosis but can help guide you toward professional evaluation.",
    ageRange: "0-12 years",
    questions: [
      {
        id: "b1",
        question: "Does your child have difficulty tracking moving objects with their eyes?",
        description: "For example, following a toy or your face as it moves side to side",
        options: frequencyOptions,
      },
      {
        id: "b2",
        question: "Does your child frequently bump into furniture or objects?",
        description: "More than what seems typical for their age",
        options: frequencyOptions,
      },
      {
        id: "b3",
        question: "Does your child hold books or objects very close to their face?",
        options: frequencyOptions,
      },
      {
        id: "b4",
        question: "Does your child squint or close one eye when looking at things?",
        options: frequencyOptions,
      },
      {
        id: "b5",
        question: "Does your child tilt their head to see better?",
        options: frequencyOptions,
      },
      {
        id: "b6",
        question: "Does your child complain of headaches, especially after visual tasks?",
        description: "Reading, screen time, or detailed work",
        options: frequencyOptions,
      },
      {
        id: "b7",
        question: "Does your child have difficulty recognizing familiar faces from a distance?",
        options: yesNoOptions,
      },
      {
        id: "b8",
        question: "Does your child avoid activities that require good vision?",
        description: "Drawing, puzzles, reading, or ball games",
        options: frequencyOptions,
      },
      {
        id: "b9",
        question: "Have you noticed your child's eyes appearing misaligned or crossed?",
        options: yesNoOptions,
      },
      {
        id: "b10",
        question: "Does your child have unusual sensitivity to light?",
        options: frequencyOptions,
      },
    ],
  },
  deafness: {
    type: "deafness",
    title: "Hearing Screening Survey",
    description: "This survey helps identify potential hearing impairment signs in children. Early detection is crucial for speech and language development.",
    ageRange: "0-12 years",
    questions: [
      {
        id: "d1",
        question: "Does your child respond when you call their name from another room?",
        options: [
          { label: "Always responds", value: 0 },
          { label: "Sometimes responds", value: 1 },
          { label: "Never responds", value: 2 },
        ],
      },
      {
        id: "d2",
        question: "Does your child turn toward sounds or voices?",
        description: "Especially soft or distant sounds",
        options: [
          { label: "Always", value: 0 },
          { label: "Sometimes", value: 1 },
          { label: "Never", value: 2 },
        ],
      },
      {
        id: "d3",
        question: "Does your child ask 'What?' or need things repeated frequently?",
        options: frequencyOptions,
      },
      {
        id: "d4",
        question: "Does your child speak louder than seems necessary?",
        options: frequencyOptions,
      },
      {
        id: "d5",
        question: "Does your child prefer the TV or music at a louder volume than others?",
        options: frequencyOptions,
      },
      {
        id: "d6",
        question: "Does your child watch your face intently when you speak?",
        description: "As if reading lips",
        options: frequencyOptions,
      },
      {
        id: "d7",
        question: "Has your child's speech development seemed delayed compared to peers?",
        options: yesNoOptions,
      },
      {
        id: "d8",
        question: "Does your child have difficulty following verbal instructions?",
        description: "Especially multi-step instructions",
        options: frequencyOptions,
      },
      {
        id: "d9",
        question: "Does your child seem to hear better from one ear than the other?",
        options: yesNoOptions,
      },
      {
        id: "d10",
        question: "Has your child had frequent ear infections?",
        options: yesNoOptions,
      },
    ],
  },
  dyslexia: {
    type: "dyslexia",
    title: "Learning Difference Screening Survey",
    description: "This survey helps identify potential signs of dyslexia in children. Dyslexia affects reading and language processing but is not related to intelligence.",
    ageRange: "5-12 years",
    questions: [
      {
        id: "dy1",
        question: "Does your child have difficulty learning letter names and sounds?",
        options: frequencyOptions,
      },
      {
        id: "dy2",
        question: "Does your child confuse letters that look similar (b/d, p/q)?",
        options: frequencyOptions,
      },
      {
        id: "dy3",
        question: "Does your child struggle to sound out new words?",
        options: frequencyOptions,
      },
      {
        id: "dy4",
        question: "Does your child read very slowly compared to classmates?",
        options: yesNoOptions,
      },
      {
        id: "dy5",
        question: "Does your child avoid reading aloud or get anxious about it?",
        options: frequencyOptions,
      },
      {
        id: "dy6",
        question: "Does your child have difficulty spelling common words?",
        description: "Words they should know by now",
        options: frequencyOptions,
      },
      {
        id: "dy7",
        question: "Does your child have trouble remembering sequences (days, months, alphabet)?",
        options: frequencyOptions,
      },
      {
        id: "dy8",
        question: "Does your child have difficulty following written instructions?",
        description: "Even when they understand verbal instructions well",
        options: frequencyOptions,
      },
      {
        id: "dy9",
        question: "Does your child skip words or lines when reading?",
        options: frequencyOptions,
      },
      {
        id: "dy10",
        question: "Is there a family history of reading or spelling difficulties?",
        options: yesNoOptions,
      },
    ],
  },
  speech_disability: {
    type: "speech_disability",
    title: "Speech & Language Screening Survey",
    description: "This survey helps identify potential speech and language delays or disorders in children. Early intervention can significantly improve outcomes.",
    ageRange: "0-12 years",
    questions: [
      {
        id: "s1",
        question: "Is your child's speech difficult for others to understand?",
        description: "People outside the family",
        options: [
          { label: "Everyone understands easily", value: 0 },
          { label: "Some people have difficulty", value: 1 },
          { label: "Very hard to understand", value: 2 },
        ],
      },
      {
        id: "s2",
        question: "Does your child substitute sounds in words (e.g., 'wabbit' for 'rabbit')?",
        options: frequencyOptions,
      },
      {
        id: "s3",
        question: "Does your child stutter or repeat sounds/words?",
        options: frequencyOptions,
      },
      {
        id: "s4",
        question: "Does your child have difficulty putting words together in sentences?",
        description: "Age-appropriate sentences",
        options: frequencyOptions,
      },
      {
        id: "s5",
        question: "Does your child have a limited vocabulary for their age?",
        options: yesNoOptions,
      },
      {
        id: "s6",
        question: "Does your child have trouble finding the right words to express themselves?",
        options: frequencyOptions,
      },
      {
        id: "s7",
        question: "Does your child have difficulty following conversations?",
        options: frequencyOptions,
      },
      {
        id: "s8",
        question: "Does your child avoid speaking in social situations?",
        options: frequencyOptions,
      },
      {
        id: "s9",
        question: "Has your child been late in reaching speech milestones?",
        description: "First words, putting words together",
        options: yesNoOptions,
      },
      {
        id: "s10",
        question: "Does your child have difficulty with the rhythm or flow of speech?",
        description: "Speaking too fast, too slow, or monotone",
        options: frequencyOptions,
      },
    ],
  },
};

export const getLikelihood = (score: number, maxScore: number): { level: "low" | "medium" | "high"; percentage: number } => {
  const percentage = Math.round((score / maxScore) * 100);
  
  if (percentage < 30) {
    return { level: "low", percentage };
  } else if (percentage < 60) {
    return { level: "medium", percentage };
  } else {
    return { level: "high", percentage };
  }
};

export const getRecommendations = (type: DisabilityType, level: "low" | "medium" | "high"): string[] => {
  const baseRecommendations: Record<DisabilityType, Record<"low" | "medium" | "high", string[]>> = {
    blindness: {
      low: [
        "Continue monitoring your child's visual development",
        "Schedule regular eye check-ups as recommended for their age",
        "Ensure good lighting when your child reads or does detailed work",
      ],
      medium: [
        "Schedule an appointment with a pediatric ophthalmologist",
        "Talk to your child's teacher about their classroom vision",
        "Consider a comprehensive eye exam in the next few weeks",
        "Monitor for any changes in visual behaviors",
      ],
      high: [
        "We strongly recommend scheduling an appointment with a pediatric ophthalmologist soon",
        "Talk to your pediatrician about your observations",
        "Request a vision screening at school if available",
        "Keep a log of visual behaviors to share with the doctor",
        "Learn about resources for children with visual impairments",
      ],
    },
    deafness: {
      low: [
        "Continue monitoring your child's hearing and speech development",
        "Ensure regular hearing screenings at well-child visits",
        "Maintain a language-rich environment at home",
      ],
      medium: [
        "Schedule a hearing evaluation with an audiologist",
        "Discuss your observations with your pediatrician",
        "Monitor for any changes in hearing behaviors",
        "Consider having hearing checked in different environments",
      ],
      high: [
        "We strongly recommend scheduling a comprehensive hearing evaluation with a pediatric audiologist",
        "Talk to your pediatrician about your concerns right away",
        "Learn about early intervention services in your area",
        "Consider meeting with a speech-language pathologist",
        "Explore resources for children with hearing impairments",
      ],
    },
    dyslexia: {
      low: [
        "Continue supporting your child's reading development",
        "Read together daily and make it enjoyable",
        "Monitor progress and keep communication open with teachers",
      ],
      medium: [
        "Request an educational evaluation through your child's school",
        "Talk to the teacher about specific reading challenges observed",
        "Consider additional reading support or tutoring",
        "Look into structured literacy programs",
      ],
      high: [
        "Request a formal evaluation for learning disabilities through the school",
        "Consider a private educational psychologist evaluation",
        "Research Orton-Gillingham or other structured literacy approaches",
        "Connect with the school's special education team",
        "Join support groups for parents of children with dyslexia",
      ],
    },
    speech_disability: {
      low: [
        "Continue encouraging communication at home",
        "Read and talk with your child regularly",
        "Monitor speech development milestones",
      ],
      medium: [
        "Schedule an evaluation with a speech-language pathologist",
        "Discuss concerns with your pediatrician",
        "Practice speech exercises recommended by professionals",
        "Be patient and give your child time to express themselves",
      ],
      high: [
        "We strongly recommend evaluation by a speech-language pathologist",
        "Talk to your pediatrician about early intervention services",
        "Learn about speech therapy options in your area",
        "Create a supportive environment for communication at home",
        "Connect with other parents of children with speech differences",
      ],
    },
  };

  return baseRecommendations[type][level];
};
