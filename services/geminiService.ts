
import { GoogleGenAI, Type } from "@google/genai";
import { RoadmapResponse } from "../types";

const API_KEY = process.env.API_KEY;

export class GeminiService {
  private ai: any;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY! });
  }

  async generateRoadmap(skill: string, level: string, duration: string): Promise<RoadmapResponse | null> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a professional learning roadmap for ${skill} at ${level} level over ${duration}.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              skill: { type: Type.STRING },
              level: { type: Type.STRING },
              duration: { type: Type.STRING },
              steps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    week: { type: Type.NUMBER },
                    topic: { type: Type.STRING },
                    description: { type: Type.STRING },
                    resources: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["week", "topic", "description", "resources"]
                }
              }
            },
            required: ["skill", "level", "duration", "steps"]
          }
        }
      });
      return JSON.parse(response.text);
    } catch (error) {
      console.error("Error generating roadmap:", error);
      return null;
    }
  }

  async getResumeFeedback(resumeText: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Review this student resume and provide specific feedback on how to improve it for modern tech jobs. Focus on keywords, structure, and impact statements: \n\n${resumeText}`,
      });
      return response.text;
    } catch (error) {
      console.error("Error getting resume feedback:", error);
      return "Unable to analyze resume at this time.";
    }
  }

  async getMentorChatResponse(message: string, userProfile: any): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: message,
        config: {
          systemInstruction: `You are an empathetic student mentor on SkillXchange. Your goal is to motivate students, provide career guidance, and help them navigate their learning journey. User context: ${JSON.stringify(userProfile)}`,
        }
      });
      return response.text;
    } catch (error) {
      console.error("Error in mentor chat:", error);
      return "I'm having a little trouble thinking right now. Could you repeat that?";
    }
  }

  async getMarketTrends(): Promise<{ demand: string; jobs: string }> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Summarize the current top 3 high-demand skills and top 3 job trends for entry-level tech in 2 sentences each for a dashboard.",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              demand: { type: Type.STRING },
              jobs: { type: Type.STRING }
            }
          }
        }
      });
      return JSON.parse(response.text);
    } catch (error) {
      return {
        demand: "AI/ML, Fullstack Development, and Cybersecurity are seeing rapid growth.",
        jobs: "Remote-first junior roles and specialized DevOps internships are trending."
      };
    }
  }
}

export const gemini = new GeminiService();
