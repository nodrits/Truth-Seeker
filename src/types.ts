export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  streakCount: number;
  lastActiveDate: string | null;
  badges: string[];
  readingProgress: Record<string, number>;
  createdAt: string;
}

export interface Prayer {
  id: string;
  userId: string;
  authorName: string;
  text: string;
  createdAt: string;
  isPublic: boolean;
  likes: string[];
}

export interface JournalEntry {
  id: string;
  userId: string;
  content: string;
  prompt: string;
  createdAt: string;
  mood?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  createdAt: string;
}

export interface ReadingPlan {
  id: string;
  title: string;
  description: string;
  category: string;
  durationDays: number;
  imageUrl: string;
  days: ReadingPlanDay[];
}

export interface ReadingPlanDay {
  day: number;
  title: string;
  scripture: string;
  content: string;
  reflectionPrompt: string;
}
