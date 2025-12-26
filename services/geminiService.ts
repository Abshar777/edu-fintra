
import { GoogleGenAI, Type } from "@google/genai";
import { Insight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getEducationalInsight = async (): Promise<Insight> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Generate a profound trading intelligence insight for a platform named Edufintra. Focus on market psychology, technical mastery, and the future of algorithmic trading. Keep it concise, high-end, and professional.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          topic: { type: Type.STRING },
          wisdom: { type: Type.STRING },
          author: { type: Type.STRING }
        },
        required: ["topic", "wisdom", "author"]
      }
    }
  });

  try {
    return JSON.parse(response.text.trim()) as Insight;
  } catch (e) {
    return {
      topic: "Market Synthesis",
      wisdom: "Wealth is not found in the noise of the ticker, but in the silence between the moves.",
      author: "Edufintra Quant"
    };
  }
};

export const getPlaygroundChallenge = async (): Promise<{ challenge: string; hint: string }> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Create a short trading-related logical puzzle or technical analysis riddle. Something a pro trader would find intriguing.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          challenge: { type: Type.STRING },
          hint: { type: Type.STRING }
        },
        required: ["challenge", "hint"]
      }
    }
  });

  try {
    return JSON.parse(response.text.trim());
  } catch (e) {
    return {
      challenge: "I have two peaks but am not a mountain; I suggest a fall but am not a leaf. What pattern am I?",
      hint: "Double trouble for bulls."
    };
  }
};
