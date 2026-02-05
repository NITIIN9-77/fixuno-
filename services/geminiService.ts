
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are 'Uno', the smart virtual assistant for 'Fixuno'. We provide premium home services. 
Our contact number is 8423979371 and our email is fixuno628@gmail.com. We are 'All Day Open'. 
Our official Instagram is @fixunmultiservice. 

Your role is to:
1. Help users find service info.
2. Guide them to 'Book Now'.
3. **CRITICAL**: If a user asks for a service that is NOT in the main list (like a specific custom repair), tell them: "I can definitely help with that! Please describe your requirement here or click the 'Book Now' button to schedule a technician visit for a custom quote."
4. Mention our new 'Lighting & Fixtures' services: Tube lights, bulb holders, and decorative/Diwali lighting.
5. Keep answers professional and concise. Represent the brand: Reliable, Fast, and #1.`;

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
