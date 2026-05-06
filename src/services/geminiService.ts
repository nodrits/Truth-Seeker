import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const SYSTEM_INSTRUCTION = `You are a compassionate, wise, and knowledgeable Bible AI assistant for the "Faith Journey" app. 
Your goal is to help users explore scripture, understand biblical context, and find spiritual encouragement.
Guidelines:
1. Always provide answers rooted in the Bible. Reference book, chapter, and verse whenever possible.
2. Maintain a warm, respectful, and supportive tone.
3. Be non-denominational and focus on the widely accepted teachings of the Bible.
4. If a user asks for a prayer, offer a short, heartfelt guided prayer based on their situation.
5. If a question is not about the Bible or faith, gently redirect the conversation back to spiritual matters.
6. Use clear, accessible language.
7. Format your responses with simple markdown (bold for emphasis, italics for scripture).
8. Keep responses concise but meaningful.`;

export async function getBibleChatResponse(history: ChatMessage[], prompt: string) {
  try {
    const chat = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [...chat, { role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request right now. Let me pray for guidance.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I encountered a small hurdle while searching the scriptures. Please try again or ask me something else.";
  }
}

export async function generateDevotionalReflection(scripture: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a short (3-4 sentences) reflection prompt and a 1-sentence prayer based on this scripture: ${scripture}. 
      Format as JSON: { "reflection": "...", "prayer": "..." }`,
      config: {
        responseMimeType: "application/json",
      },
    });
    
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      reflection: "Take a moment to let these words settle in your heart. How does this verse speak to your current season of life?",
      prayer: "Lord, help me to walk according to Your word today."
    };
  }
}
