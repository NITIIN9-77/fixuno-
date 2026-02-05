
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are 'Uno 2.0', the highly advanced customer intelligence assistant for 'Fixuno'.
Fixuno is the #1 provider for Home Appliance Installations, Repairs, and Maintenance.

RELIABILITY PROTOCOL:
- Contact: 8423979371 | Email: fixuno628@gmail.com.
- Status: All Day Open (24/7 Support).
- Core Value: Premium, Fast, and Trusted.

INQUIRY HANDLING:
1. If the service is listed in our catalog (AC, Wiring, Plumbing, Large Appliances), guide the user to the specific page or suggest "Booking Now".
2. If the user asks for a service NOT in our list (e.g., painting, carpentry), respond: "That's a great request! While it's not in our standard catalog, our master technicians often handle custom home improvements. Please describe your project here or click 'Book Now' to have a specialist visit for a custom quote."
3. NEVER say you have trouble connecting. If an error occurs, provide a static friendly message suggesting a phone call to 8423979371.
4. Always prioritize a "Book Now" or "Visit our Services" call to action.
5. Be concise, professional, and obsessed with customer satisfaction.`;

export const getChatResponse = async (message: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    });
    return response.text || "I'm ready to assist with your home service needs. Please tell me more!";
  } catch (error) {
    return "I'm focusing on your request right now. For immediate priority booking, please call our direct hotline at 8423979371.";
  }
};

export const getServiceExplanation = async (serviceName: string, subServiceName: string, price: number): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Explain "${subServiceName}" (Part of ${serviceName}). Focus on why it's essential for home safety/comfort. Cost: ₹${price}. Be concise.`;
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { systemInstruction: "You are Uno, a helpful service expert." },
    });
    return response.text || "Professional maintenance ensures longevity and efficiency of your appliances.";
  } catch (error) {
    return "This professional service ensures your appliance operates at peak performance.";
  }
};
