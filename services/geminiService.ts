
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are 'Uno', the smart virtual assistant for 'Fixuno'. We provide premium home services. 
Our contact number is 8423979371 and our email is fixuno628@gmail.com. We are 'All Day Open'. 
Our official Instagram is @fixunmultiservice. Your role is to help users with service info and guide them to 'Book Now'. 
Keep answers professional and concise. Available services: AC, Fan, Wiring, Switchboards, General Appliances, Plumbing, Pumps, and Parts. 
Represent the brand: Reliable, Fast, and #1.`;

export const getChatResponse = async (message: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    
    return response.text || "I'm here to help, but I couldn't process that request. Could you try again?";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "I'm having a little trouble connecting to my brain right now. Please try again in a few seconds!";
  }
};

export const getServiceExplanation = async (serviceName: string, subServiceName: string, price: number): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `As 'Uno', explain the service "${subServiceName}" (Part of ${serviceName}, Cost: ₹${price}). Keep it concise and professional for a homeowner. Explain benefits. No CTA.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are 'Uno', a helpful assistant for 'Fixuno'.`,
      },
    });

    return response.text || "This service ensures top-quality maintenance for your home appliance.";
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to get explanation.");
  }
};
