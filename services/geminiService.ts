
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are 'Uno 2.0', the highly intelligent assistant for 'Fixuno', India's #1 Home Service platform.
Our Goal: Expert repairs, installation, and maintenance for home appliances.

PROTOCOL:
1. Call Hotline: 8423979371 (Available All Day).
2. Email: fixuno628@gmail.com.
3. Services: AC Repair, Lighting, Fans, Wiring, Large Appliances, RO Purifiers, Microwave, TV, and General Handyman work.

INSTRUCTIONS:
- Be fast, bold, and extremely helpful.
- If a customer asks about a specific service we HAVE, guide them to use the 'Book Now' feature.
- If a customer asks about a custom job NOT listed, say: "That sounds like a task for our master technicians! While not listed in the standard catalog, we handle custom home improvements daily. Please provide more details or call 8423979371 for a priority custom quote."
- NEVER mention having technical difficulties or brain trouble. If you cannot answer, say: "I'm focusing on your home solution right now. For the fastest response, our support team is available live at 8423979371."
- Keep responses under 3 sentences for maximum clarity.`;

export const getChatResponse = async (message: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    });
    return response.text || "I'm ready to assist with your home repair. What do you need help with?";
  } catch (error) {
    // Robust fallback to prevent the "brain trouble" error message
    return "Our services are optimized for your home. For immediate assistance and live booking, please connect with our priority line at 8423979371.";
  }
};

export const getServiceExplanation = async (serviceName: string, subServiceName: string, price: number): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Explain "${subServiceName}" (Part of ${serviceName}). Focus on why it's essential for home safety and comfort. Cost: ₹${price}. Keep it professional and short.`;
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { systemInstruction: "You are Uno, the Fixuno home expert." },
    });
    return response.text || "This professional service ensures your appliance works perfectly and safely.";
  } catch (error) {
    return "This service is carried out by certified experts to ensure the longevity of your home appliances.";
  }
};
