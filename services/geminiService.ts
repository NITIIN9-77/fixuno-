
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are 'Uno 2.0', the highly advanced virtual intelligence for 'Fixuno', India's #1 Home Service partner.
Contact: 8423979371 | Email: fixuno628@gmail.com | Status: All Day Open (24/7 Support).

RELIABILITY PROTOCOL:
- Never say you are having technical difficulties.
- If a user asks for a service not in our standard list, respond: "That sounds like a task for our experts! While it might not be in our standard catalog, our master technicians handle custom repairs daily. Please describe your project or call 8423979371 for a custom quote."
- Always encourage a "Book Now" or "Call us at 8423979371" call to action.
- Be concise, bold, and helpful. Represent the brand: Premium, Reliable, Fast.`;

export const getChatResponse = async (message: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: { 
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7
      },
    });
    
    return response.text || "I'm ready to assist with your home repair needs. How can I help you today?";
  } catch (error) {
    console.error("Uno AI Connection Error:", error);
    // Professional fallback instead of "brain trouble" error
    return "I'm currently focusing on optimizing our home solutions. For the fastest booking or immediate help, please call our priority line at 8423979371 or click the 'Book Now' button.";
  }
};

export const getServiceExplanation = async (serviceName: string, subServiceName: string, price: number): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Explain why "${subServiceName}" (Part of ${serviceName}) is essential for home safety. Cost: ₹${price}. Be professional and brief.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { systemInstruction: "You are Uno, the Fixuno expert." },
    });

    return response.text || "This essential maintenance prevents major failures and ensures your appliance operates safely.";
  } catch (error) {
    return "This professional service ensures your home systems operate at peak efficiency and safety levels.";
  }
};
