SkillXchange – Student Skill Exchange Platform (Frontend)
Overview

SkillXchange is a full-stack student skill development and networking platform designed to bridge the gap between academic learning and industry readiness.

The platform integrates AI-powered guidance, structured learning roadmaps, career-building tools, and peer networking into a unified ecosystem.

SkillXchange enables students to:

🔐 Authenticate using Google Login

👤 Create and manage personal profiles

📊 Access a personalized dashboard

🗺️ Generate AI-powered learning roadmaps (based on skill, level, and duration)

🤖 Interact with Gemini AI for guidance and skill suggestions

📄 Build and enhance resumes

🌐 Create and showcase personal portfolios

💼 Explore job opportunities

🤝 Connect with other students for collaboration and skill exchange

🔎 Discover trending and in-demand skills

🧠 Receive structured learning plans dynamically generated via backend APIs

The frontend is developed using React, TypeScript, and Vite, ensuring modular architecture, scalability, and type safety.

The application is designed to integrate with a Node.js + Express backend for authentication, roadmap generation APIs, and future MongoDB-based data persistence.

Tech Stack
Frontend

React 18

TypeScript

Vite

CSS (Custom styling)

Gemini AI integration (geminiService.ts)

Planned Backend Integration

Node.js

Express.js

REST APIs

MongoDB (Future Integration)

Google OAuth

Project Architecture
Frontend (React + TypeScript)
        ↓
Fetch API Requests
        ↓
Backend (Node + Express)
        ↓
Database (MongoDB – planned)
        ↓
AI Services (Gemini API)

Project Structure
skillxchange_frontend/
│
├── App.tsx
├── index.tsx
├── index.html
├── types.ts
├── constants.tsx
├── tsconfig.json
├── vite.config.ts
├── package.json
│
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── LoginModal.tsx
│   └── RegisterModal.tsx
│
├── views/
│   ├── LandingPage.tsx
│   ├── Dashboard.tsx
│   ├── Explore.tsx
│   ├── Connections.tsx
│   └── Profile.tsx
│
└── services/
    └── geminiService.ts

Core Features
1. Google Authentication Interface

Login & Registration Modals

Designed for backend OAuth integration

Supports session-based user flow

2. Personalized Dashboard

Displays user-specific information

Entry point for roadmap creation and skill interaction

Central navigation hub

3. AI-Powered Roadmap Generator

Users can:

Select a skill

Choose their current level

Define learning duration

The system:

Sends data to backend API

Generates structured learning plans

Displays roadmap dynamically

4. Gemini AI Integration

Integrated via services/geminiService.ts to:

Generate intelligent responses

Suggest learning strategies

Assist in roadmap structuring

Provide career-related guidance

5. Resume Builder

Structured input interface

Designed for AI-based resume enhancement

Ready for backend storage integration

6. Portfolio Builder

Allows users to showcase projects and skills

Customizable profile presentation

7. Job Explorer

Displays job opportunities

Can be extended to integrate external job APIs

8. Connections Module

Student networking interface

Future-ready for real-time interaction and database storage

Installation & Setup
1. Install Dependencies
npm install

2. Configure Environment Variables

Create a .env.local file in the root:

VITE_GEMINI_API_KEY=your_gemini_api_key

3. Start Development Server
npm run dev


Application runs on:

http://localhost:5173

Build for Production
npm run build


Preview production build:

npm run preview

Backend Dependency

For full functionality, backend must run at:

http://localhost:5000


Backend handles:

Google OAuth verification

Roadmap generation APIs

Persistent user data

Database integration

Without backend, some features may operate using AI responses or temporary local state.

Future Enhancements

MongoDB user persistence

JWT-based authentication

Real-time chat system

Skill-matching algorithm

AI-powered resume analysis

External job API integration

Role-based access system

Academic Context

This project is developed as part of a Full Stack Web Development curriculum.
It demonstrates integration of:

Modern React + TypeScript architecture

REST API communication

AI service integration

Scalable frontend design principles