
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are 'Uno 2.0', the highly advanced and reliable virtual assistant for 'Fixuno', India's #1 Home Service partner.
Our goal: Provide expert repairs, installation, and maintenance for home appliances.

PROTOCOL:
- Hotline: 8423979371 (Available All Day).
- Email: fixuno628@gmail.com.
- We service: AC, Fans, Lighting, Wiring, Large Appliances, and General Handyman work.

INSTRUCTIONS:
1. Always be polite, professional, and bold.
2. If a customer asks about a service we have, encourage them to "Book Now".
3. If they ask for something not listed, say: "That's a great request! While it's not in our immediate catalog, our certified technicians handle custom projects daily. Please share more details or call 8423979371 for a priority custom quote."
4. NEVER mention having "trouble connecting to your brain." If an error occurs, suggest a phone call for immediate help.
5. Keep answers short (max 3 sentences).`;

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
    
    return response.text || "I'm ready to assist with your home repair needs. What can I help you with?";
  } catch (error) {
    // Robust fallback to prevent the annoying error message
    console.error("Uno AI Error:", error);
    return "I'm currently focusing on your home solutions. For the fastest booking or help, please call our direct hotline at 8423979371 or click the 'Book Now' button.";
  }
};

export const getServiceExplanation = async (serviceName: string, subServiceName: string, price: number): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Explain why "${subServiceName}" (Part of ${serviceName}) is vital for home safety. Cost: ₹${price}. Be professional and brief.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { systemInstruction: "You are Uno, the Fixuno home service expert." },
    });

    return response.text || "This essential maintenance prevents major appliance failure and ensures safety.";
  } catch (error) {
    return "This professional service ensures your appliance operates at peak efficiency and safety levels.";
  }
};
