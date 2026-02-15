
import React from 'react';

export const MOCK_USERS = [
  {
    id: '1',
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    avatar: 'https://picsum.photos/seed/aarav/200',
    skills: ['React', 'Python', 'Tailwind'],
    interests: ['Machine Learning', 'Public Speaking'],
    bio: 'Looking to exchange my React knowledge for some ML basics!',
    location: 'Bangalore, India',
    profession: 'Computer Science Student'
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya@example.com',
    avatar: 'https://picsum.photos/seed/priya/200',
    skills: ['UI/UX Design', 'Figma', 'Sketch'],
    interests: ['Frontend Dev', 'Photography'],
    bio: 'Passionate about accessible design.',
    location: 'Mumbai, India',
    profession: 'Design Enthusiast'
  },
  {
    id: '3',
    name: 'Vikram Singh',
    email: 'vik@example.com',
    avatar: 'https://picsum.photos/seed/vik/200',
    skills: ['Node.js', 'MongoDB', 'AWS'],
    interests: ['Security', 'Blockchain'],
    bio: 'Backend wizard in the making.',
    location: 'Pune, India',
    profession: 'Engineering Student'
  }
];

export const MOCK_JOBS = [
  {
    id: 'j1',
    role: 'Junior Frontend Developer',
    company: 'TechFlow Solutions',
    package: '₹8 - ₹12 LPA',
    process: 'Online Assessment -> Technical Round -> HR',
    requirements: ['React', 'TypeScript', 'Responsive Design'],
    location: 'Remote'
  },
  {
    id: 'j2',
    role: 'Backend Intern',
    company: 'CloudScale Systems',
    package: '₹30k/month',
    process: 'Resume Shortlisting -> Logic Test -> Interview',
    requirements: ['Node.js', 'PostgreSQL', 'Git'],
    location: 'Hyderabad'
  }
];

export const EXPLORE_SLIDES = [
  {
    title: "Improve Your Resume",
    description: "Upload your resume and get instant AI-powered feedback to help you stand out.",
    id: "resume"
  },
  {
    title: "Build Your Portfolio",
    description: "Learn how to showcase your projects in a way that catches recruiter eyes.",
    id: "portfolio"
  },
  {
    title: "Interview Prep",
    description: "Practice common questions and get tips on body language and confidence.",
    id: "interview"
  }
];

export const WHY_SLIDES = [
  { title: "Peer-to-Peer Learning", description: "Learn faster by teaching others and getting mentored by peers." },
  { title: "AI-Powered Guidance", description: "Get personalized roadmaps and career advice tailored to your goals." },
  { title: "Exclusive Job Data", description: "Access curated job openings and hiring insights specifically for students." },
  { title: "Real Community", description: "Join a network of motivated learners who share your passion." },
  { title: "Completely Free", description: "Build your future without the burden of expensive course fees." }
];
