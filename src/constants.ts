import { ReadingPlan } from "./types";

export const READING_PLANS: ReadingPlan[] = [
  {
    id: "finding-peace",
    title: "Finding Peace in Anxiety",
    description: "A 7-day journey through scriptures that bring calm to a restless soul.",
    category: "Emotional Well-being",
    durationDays: 7,
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400",
    days: [
      {
        day: 1,
        title: "Cast Your Cares",
        scripture: "1 Peter 5:7",
        content: "Casting all your anxieties on him, because he cares for you.",
        reflectionPrompt: "What is one specific burden you need to hand over to God today?"
      },
      {
        day: 2,
        title: "Be Not Afraid",
        scripture: "Isaiah 41:10",
        content: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand.",
        reflectionPrompt: "How does knowing God is holding your hand change your perspective on today's challenges?"
      }
    ]
  },
  {
    id: "strength-daily",
    title: "Strength for the Day",
    description: "Build a habit of starting each morning with God's power.",
    category: "Daily Walk",
    durationDays: 14,
    imageUrl: "https://images.unsplash.com/photo-1499209974431-9dac3adaf471?auto=format&fit=crop&q=80&w=400",
    days: [
      {
        day: 1,
        title: "Joy of the Lord",
        scripture: "Nehemiah 8:10",
        content: "Do not grieve, for the joy of the Lord is your strength.",
        reflectionPrompt: "Where can you find God's joy in the midst of your current situation?"
      }
    ]
  }
];

export const MOCK_COMMUNITY_PRAYERS = [
  {
    id: "1",
    authorName: "Sarah J.",
    text: "Praying for my mother's health. She's going through a tough recovery.",
    likesCount: 12,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    authorName: "Mark T.",
    text: "So thankful for the new job opportunity! God is good.",
    likesCount: 5,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  }
];
