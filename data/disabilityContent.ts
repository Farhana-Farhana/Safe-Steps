import { Eye, Ear, BookOpen, MessageCircle, LucideIcon } from "lucide-react";

export interface DisabilityContent {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  heroImage: string;
  overview: {
    definition: string;
    prevalence: string;
    keyPoints: string[];
  };
  earlySigns: {
    infants: string[];
    toddlers: string[];
    schoolAge: string[];
  };
  diagnosis: {
    process: string;
    professionals: string[];
    tests: string[];
    timeline: string;
  };
  treatment: {
    options: {
      title: string;
      description: string;
    }[];
    earlyIntervention: string;
  };
  resources: {
    title: string;
    description: string;
    type: "organization" | "website" | "book" | "support";
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const disabilityContent: Record<string, DisabilityContent> = {
  blindness: {
    id: "blindness",
    title: "Blindness & Visual Impairment",
    description: "Understanding visual impairment in children, from early detection to support strategies",
    icon: Eye,
    color: "blindness",
    heroImage: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200",
    overview: {
      definition: "Visual impairment in children ranges from partial sight loss to complete blindness. It affects how children learn, develop, and interact with their environment. Early identification and intervention are crucial for optimal development.",
      prevalence: "Approximately 1 in 1,000 children are born with significant visual impairment. An additional 1 in 3,000 children become visually impaired before age 16.",
      keyPoints: [
        "Vision develops rapidly in the first years of life",
        "Many visual impairments can be corrected or managed if caught early",
        "Children can thrive with proper support and accommodations",
        "Early intervention services can significantly improve outcomes",
      ],
    },
    earlySigns: {
      infants: [
        "Doesn't make eye contact by 3 months",
        "Doesn't follow objects with eyes",
        "Eyes appear crossed or turned out after 4 months",
        "Unusual eye movements (nystagmus)",
        "White or grayish-white color in the pupil",
        "Eyes that flutter quickly from side to side or up and down",
      ],
      toddlers: [
        "Holds objects very close to face",
        "Squints or closes one eye frequently",
        "Tilts head to look at things",
        "Bumps into objects often",
        "Shows sensitivity to light",
        "Rubs eyes frequently",
      ],
      schoolAge: [
        "Difficulty reading or loses place while reading",
        "Sits very close to TV or computer",
        "Frequent headaches or eye strain",
        "Trouble seeing the board at school",
        "Avoids activities requiring distance vision",
        "Poor hand-eye coordination",
      ],
    },
    diagnosis: {
      process: "Diagnosis typically involves comprehensive eye examinations that assess visual acuity, eye alignment, and overall eye health. Pediatricians often perform initial screenings, with referrals to ophthalmologists for detailed evaluation.",
      professionals: [
        "Pediatric Ophthalmologist",
        "Optometrist",
        "Vision Therapist",
        "Low Vision Specialist",
      ],
      tests: [
        "Visual acuity tests (eye charts)",
        "Refraction assessment",
        "Eye muscle function tests",
        "Dilated eye examination",
        "Visual field testing",
        "Color vision testing",
      ],
      timeline: "Initial screenings begin at birth and continue through childhood. If concerns arise, specialized testing can be performed at any age, with some tests adapted for infants.",
    },
    treatment: {
      options: [
        {
          title: "Corrective Lenses",
          description: "Glasses or contact lenses can correct refractive errors like nearsightedness, farsightedness, and astigmatism.",
        },
        {
          title: "Surgery",
          description: "Surgical procedures can address conditions like cataracts, strabismus (crossed eyes), or blocked tear ducts.",
        },
        {
          title: "Vision Therapy",
          description: "Structured exercises and activities to improve visual skills and processing.",
        },
        {
          title: "Low Vision Aids",
          description: "Magnifiers, large print materials, and assistive technology for children with partial sight.",
        },
        {
          title: "Orientation & Mobility Training",
          description: "Teaching children to navigate their environment safely and independently.",
        },
      ],
      earlyIntervention: "Early intervention services for visually impaired children can begin as early as birth. These programs help develop compensatory skills and support overall development.",
    },
    resources: [
      {
        title: "American Foundation for the Blind",
        description: "Comprehensive resources for families of children with visual impairments.",
        type: "organization",
      },
      {
        title: "National Federation of the Blind",
        description: "Advocacy, resources, and community support for blind individuals and families.",
        type: "organization",
      },
      {
        title: "Lighthouse Guild",
        description: "Vision rehabilitation services and support programs.",
        type: "organization",
      },
      {
        title: "Family Connect",
        description: "Online community and resources specifically for parents of visually impaired children.",
        type: "website",
      },
    ],
    faqs: [
      {
        question: "Can my child attend regular school?",
        answer: "Yes! Many children with visual impairments attend mainstream schools with appropriate accommodations. These may include large print materials, preferential seating, assistive technology, or support from a vision teacher.",
      },
      {
        question: "Will my child need to learn Braille?",
        answer: "Not all visually impaired children need Braille. The decision depends on the degree of vision loss and whether it's progressive. A vision specialist can help determine the best literacy approach.",
      },
      {
        question: "How can I help my child at home?",
        answer: "Create a consistent environment, use verbal descriptions, encourage independence, and work with vision specialists to learn specific strategies for daily activities.",
      },
    ],
  },
  deafness: {
    id: "deafness",
    title: "Deafness & Hearing Loss",
    description: "Comprehensive guide to hearing impairment in children, communication strategies, and support",
    icon: Ear,
    color: "deafness",
    heroImage: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1200",
    overview: {
      definition: "Hearing loss in children can range from mild to profound and may be present at birth (congenital) or develop later (acquired). It affects language development, communication, and social interaction.",
      prevalence: "About 2-3 of every 1,000 children are born with detectable hearing loss. This number increases with age as some children develop hearing loss later.",
      keyPoints: [
        "Newborn hearing screening catches most congenital hearing loss",
        "Early identification (by 3 months) and intervention (by 6 months) are critical",
        "Many children with hearing loss develop age-appropriate language with proper support",
        "Technology and communication strategies continue to improve outcomes",
      ],
    },
    earlySigns: {
      infants: [
        "Doesn't startle at loud sounds",
        "Doesn't turn toward sounds by 6 months",
        "Doesn't babble or stops babbling",
        "Doesn't respond to their name",
        "Seems to hear some sounds but not others",
        "Is not soothed by your voice",
      ],
      toddlers: [
        "Delayed speech development",
        "Unclear speech compared to peers",
        "Needs TV or music louder than others",
        "Doesn't follow simple directions",
        "Says 'huh?' or 'what?' frequently",
        "Watches faces intently when being spoken to",
      ],
      schoolAge: [
        "Difficulty following classroom discussions",
        "Struggles with reading and spelling",
        "Speaks loudly or softly inappropriately",
        "Withdraws from social situations",
        "Frequently misunderstands questions",
        "Complains of earaches or ringing in ears",
      ],
    },
    diagnosis: {
      process: "Diagnosis begins with newborn hearing screening. If concerns arise, audiologists perform comprehensive hearing evaluations. Testing is adapted for the child's age and development level.",
      professionals: [
        "Audiologist",
        "Otolaryngologist (ENT)",
        "Speech-Language Pathologist",
        "Deaf Education Specialist",
      ],
      tests: [
        "Otoacoustic Emissions (OAE)",
        "Auditory Brainstem Response (ABR)",
        "Behavioral audiometry",
        "Tympanometry",
        "Speech recognition testing",
        "Pure tone audiometry",
      ],
      timeline: "Newborn screening occurs before hospital discharge. If screening isn't passed, diagnostic testing should occur by 3 months. Intervention should begin by 6 months.",
    },
    treatment: {
      options: [
        {
          title: "Hearing Aids",
          description: "Devices that amplify sound for children with mild to severe hearing loss.",
        },
        {
          title: "Cochlear Implants",
          description: "Surgically implanted devices that provide sound perception for severe to profound hearing loss.",
        },
        {
          title: "Speech-Language Therapy",
          description: "Specialized therapy to develop speech, language, and listening skills.",
        },
        {
          title: "Sign Language",
          description: "Visual language that can be used alone or alongside spoken language (total communication).",
        },
        {
          title: "FM Systems",
          description: "Wireless technology that transmits the speaker's voice directly to hearing aids.",
        },
      ],
      earlyIntervention: "Early intervention for deaf and hard-of-hearing children focuses on language development, whether through spoken language, sign language, or both. Services often include family support and parent education.",
    },
    resources: [
      {
        title: "National Association of the Deaf",
        description: "Civil rights organization providing resources and advocacy for deaf individuals.",
        type: "organization",
      },
      {
        title: "Hands & Voices",
        description: "Parent-driven organization supporting families of deaf and hard-of-hearing children.",
        type: "organization",
      },
      {
        title: "AG Bell Association",
        description: "Resources for families pursuing spoken language outcomes.",
        type: "organization",
      },
      {
        title: "Gallaudet University",
        description: "Leading academic institution for deaf education and resources.",
        type: "organization",
      },
    ],
    faqs: [
      {
        question: "Should my child learn sign language?",
        answer: "This is a personal family decision. Many families choose spoken language only, sign language only, or a combination. Consider your family's communication needs, resources, and your child's specific hearing loss.",
      },
      {
        question: "Will my child be able to speak?",
        answer: "Many children with hearing loss develop spoken language, especially with early identification and intervention. Factors include degree of hearing loss, age of intervention, and type of amplification used.",
      },
      {
        question: "How do I communicate with my baby before they have language?",
        answer: "Use visual communication (facial expressions, gestures), maintain eye contact, and consider learning baby sign language. Your audiologist and early intervention team can provide specific strategies.",
      },
    ],
  },
  dyslexia: {
    id: "dyslexia",
    title: "Dyslexia",
    description: "Understanding dyslexia: signs, assessment, and effective strategies for supporting your child",
    icon: BookOpen,
    color: "dyslexia",
    heroImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200",
    overview: {
      definition: "Dyslexia is a specific learning disability that affects reading, writing, and spelling. It's neurological in origin and is not related to intelligence. Children with dyslexia often have average to above-average intelligence.",
      prevalence: "Dyslexia affects approximately 15-20% of the population to some degree. It's the most common learning disability, accounting for 80% of all learning disabilities.",
      keyPoints: [
        "Dyslexia is a lifelong condition, but with support, individuals can excel",
        "It often runs in families (genetic component)",
        "Early identification and structured literacy instruction are key",
        "Many successful individuals have dyslexia, including entrepreneurs and artists",
      ],
    },
    earlySigns: {
      infants: [
        "Late talking compared to peers",
        "Difficulty learning new words",
        "Problems with rhyming games",
        "Trouble learning nursery rhymes",
        "Mispronouncing familiar words",
        "Difficulty remembering sequences (like alphabet)",
      ],
      toddlers: [
        "Trouble learning letter names and sounds",
        "Difficulty recognizing own name in print",
        "Avoiding drawing or writing activities",
        "Struggling to retell a story in order",
        "Mixing up words that sound similar",
        "Difficulty clapping out syllables in words",
      ],
      schoolAge: [
        "Reading below grade level",
        "Avoiding reading aloud",
        "Spelling the same word differently",
        "Difficulty copying from the board",
        "Trouble learning a foreign language",
        "Messy handwriting despite effort",
      ],
    },
    diagnosis: {
      process: "Dyslexia diagnosis involves comprehensive evaluation of reading skills, language abilities, cognitive processing, and academic achievement. Testing looks for the specific patterns associated with dyslexia.",
      professionals: [
        "Educational Psychologist",
        "School Psychologist",
        "Neuropsychologist",
        "Reading Specialist",
      ],
      tests: [
        "Phonological processing assessments",
        "Reading fluency and accuracy tests",
        "Spelling assessments",
        "Rapid naming tests",
        "IQ/cognitive testing",
        "Academic achievement testing",
      ],
      timeline: "While signs can appear in preschool, formal diagnosis typically occurs in elementary school when reading instruction begins. However, many individuals aren't diagnosed until adolescence or adulthood.",
    },
    treatment: {
      options: [
        {
          title: "Structured Literacy Instruction",
          description: "Systematic, explicit teaching of phonics, phonemic awareness, and decoding skills (like Orton-Gillingham approach).",
        },
        {
          title: "Reading Intervention Programs",
          description: "Evidence-based programs like Wilson Reading System, Lindamood-Bell, or Barton Reading.",
        },
        {
          title: "Accommodations",
          description: "Extended time on tests, audiobooks, speech-to-text software, and alternative assessment methods.",
        },
        {
          title: "Assistive Technology",
          description: "Text-to-speech software, digital highlighters, and organizational apps.",
        },
        {
          title: "Educational Therapy",
          description: "One-on-one work with a specialist to develop reading and learning strategies.",
        },
      ],
      earlyIntervention: "Early intervention for dyslexia focuses on building phonological awareness and letter-sound knowledge before formal reading instruction begins. Pre-K programs can identify at-risk children.",
    },
    resources: [
      {
        title: "International Dyslexia Association",
        description: "Leading organization providing information, research, and resources about dyslexia.",
        type: "organization",
      },
      {
        title: "Learning Ally",
        description: "Audiobook library and support for students with dyslexia.",
        type: "organization",
      },
      {
        title: "Understood.org",
        description: "Comprehensive resources for parents of children with learning differences.",
        type: "website",
      },
      {
        title: "Bookshare",
        description: "Accessible ebook library for students with reading barriers.",
        type: "website",
      },
    ],
    faqs: [
      {
        question: "Does dyslexia mean my child sees letters backwards?",
        answer: "No, this is a common misconception. Dyslexia is primarily about difficulty processing the sounds in language (phonological processing), not visual processing. Letter reversals are common in all young children learning to write.",
      },
      {
        question: "Will my child ever be able to read well?",
        answer: "With appropriate instruction and support, most children with dyslexia can become proficient readers. They may always read more slowly, but can develop strong comprehension and enjoyment of reading.",
      },
      {
        question: "Is dyslexia related to intelligence?",
        answer: "Absolutely not! Dyslexia occurs across all levels of intelligence. Many highly intelligent and successful people have dyslexia.",
      },
    ],
  },
  "speech-disability": {
    id: "speech-disability",
    title: "Speech & Language Disorders",
    description: "Guide to speech and language disorders in children: understanding, identification, and support",
    icon: MessageCircle,
    color: "speech",
    heroImage: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200",
    overview: {
      definition: "Speech and language disorders encompass difficulties with producing speech sounds, fluency (stuttering), voice, and/or understanding and using language. These disorders can affect communication, learning, and social interaction.",
      prevalence: "Approximately 8-9% of young children have a speech or language disorder. Many of these are successfully treated with early intervention.",
      keyPoints: [
        "Speech disorders affect how sounds are produced",
        "Language disorders affect understanding or expressing ideas",
        "Many children have both speech and language difficulties",
        "Early intervention leads to the best outcomes",
      ],
    },
    earlySigns: {
      infants: [
        "Limited babbling (no 'baba' or 'dada')",
        "Doesn't respond to sounds or voices",
        "No gesturing (pointing, waving) by 12 months",
        "Not using any words by 12 months",
        "Doesn't seem to understand simple words",
        "Limited variety of sounds produced",
      ],
      toddlers: [
        "Using fewer than 50 words by age 2",
        "Not combining words by age 2",
        "Speech difficult for parents to understand",
        "Losing words they previously used",
        "Frustration with communication",
        "Not following simple directions",
      ],
      schoolAge: [
        "Difficulty being understood by unfamiliar listeners",
        "Trouble finding the right words",
        "Struggling to tell stories in order",
        "Persistent stuttering",
        "Difficulty with reading and writing",
        "Problems following multi-step directions",
      ],
    },
    diagnosis: {
      process: "Speech-language pathologists conduct comprehensive evaluations examining all aspects of communication including speech sound production, language comprehension and expression, fluency, and social communication.",
      professionals: [
        "Speech-Language Pathologist",
        "Audiologist",
        "Developmental Pediatrician",
        "Child Psychologist",
      ],
      tests: [
        "Articulation assessments",
        "Language sampling and analysis",
        "Standardized language tests",
        "Oral-motor examination",
        "Hearing screening",
        "Fluency assessment",
      ],
      timeline: "Concerns can be evaluated at any age. Many speech-language milestones occur in the first three years, so early evaluation is encouraged if parents have concerns.",
    },
    treatment: {
      options: [
        {
          title: "Speech Therapy",
          description: "Individual or group sessions focusing on specific speech or language goals.",
        },
        {
          title: "Articulation Therapy",
          description: "Practice producing specific speech sounds correctly.",
        },
        {
          title: "Language Intervention",
          description: "Activities to build vocabulary, grammar, and conversation skills.",
        },
        {
          title: "Fluency Therapy",
          description: "Techniques to manage stuttering and improve smooth speech.",
        },
        {
          title: "Augmentative Communication (AAC)",
          description: "Communication devices or systems for children who need support expressing themselves.",
        },
      ],
      earlyIntervention: "Early intervention for speech-language delays begins as early as birth. Services often include parent coaching to support communication development in daily routines.",
    },
    resources: [
      {
        title: "American Speech-Language-Hearing Association",
        description: "Professional organization with family resources and therapist finder.",
        type: "organization",
      },
      {
        title: "The Stuttering Foundation",
        description: "Resources and support specifically for families dealing with stuttering.",
        type: "organization",
      },
      {
        title: "Late Talkers Foundation",
        description: "Support for families of children with language delays.",
        type: "organization",
      },
      {
        title: "NIDCD - Speech and Language",
        description: "National Institutes of Health information on speech-language disorders.",
        type: "website",
      },
    ],
    faqs: [
      {
        question: "Is it normal for toddlers to be hard to understand?",
        answer: "Some unclear speech is normal in toddlers. However, by age 2, parents should understand about 50% of their child's speech, and by age 3, about 75%. Strangers typically understand most of a 4-year-old's speech.",
      },
      {
        question: "Will my child grow out of it?",
        answer: "Some children do catch up on their own, but there's no way to predict which children will. Early evaluation and intervention are recommended because treatment is most effective when started early.",
      },
      {
        question: "Does using a pacifier or bottle cause speech problems?",
        answer: "Extended pacifier or bottle use can affect oral development, but these are rarely the sole cause of speech problems. If you have concerns, discuss them with your pediatrician or a speech-language pathologist.",
      },
    ],
  },
};
