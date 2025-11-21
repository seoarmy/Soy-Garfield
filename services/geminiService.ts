import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
// Note: process.env.API_KEY is injected by the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateArticleIdeas = async (topic: string): Promise<string[]> => {
  if (!topic) return [];

  try {
    const model = "gemini-2.5-flash";
    const prompt = `Generate 3 catchy, SEO-optimized article headlines based on the topic: "${topic}". 
    The headlines should be suitable for a professional digital marketing publication named "SoyGarfield".
    Return only a JSON array of strings.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];

    const ideas = JSON.parse(jsonText) as string[];
    return ideas;
  } catch (error) {
    console.error("Error generating article ideas:", error);
    return ["The Future of SEO in 2025", "AI Agents and Marketing", "How to Optimize for Voice Search"]; // Fallbacks
  }
};

export const checkGrammarAndTone = async (text: string): Promise<string> => {
  if (!text) return "";
  
  try {
    const model = "gemini-2.5-flash";
    const prompt = `Analyze the following text proposal for a writer application. Provide a brief, encouraging 1-sentence feedback on the tone and clarity. Text: "${text.substring(0, 300)}..."`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Feedback unavailable.";
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return "";
  }
}