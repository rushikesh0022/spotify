import { GoogleGenerativeAI } from '@google/generative-ai';
import { UserResponse } from '../types';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b",
});

export const generateMusicRecommendation = async (responses: UserResponse[]) => {
  try {
    const prompt = `Based on these user responses: ${JSON.stringify(responses)}, provide:
    1. A song recommendation in this format:
    Song Title: [title]
    Artist: [artist]
    Genre: [genre]
    
    2. A motivational quote or message that:
    - Relates to their current emotional state and chosen responses
    - Provides encouragement or validation
    - Connects the music choice to their personal journey
    Format as: "Message: [your motivational message]"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating recommendation:', error);
    return `Song Title: Bohemian Rhapsody
Artist: Queen
Genre: Rock
Message: Remember, like the diverse movements in Bohemian Rhapsody, life is a beautiful symphony of ups and downs. Embrace each moment, for they all contribute to your unique story.`;
  }
};