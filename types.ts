
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  education?: string;
  location?: string;
  phone?: string;
  profession?: string;
  purpose?: string;
  skills: string[];
  interests: string[];
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface RoadmapStep {
  week: number;
  topic: string;
  description: string;
  resources: string[];
}

export interface RoadmapResponse {
  skill: string;
  level: string;
  duration: string;
  steps: RoadmapStep[];
}

export interface JobOpportunity {
  id: string;
  role: string;
  company: string;
  package: string;
  process: string;
  requirements: string[];
  location: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | string;
  text: string;
  timestamp: Date;
}
