
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are 'Uno 2.0', the highly advanced virtual intelligence for 'Fixuno', India's #1 Home Service partner.
Contact: 8423979371 | Email: fixuno628@gmail.com | Status: All Day Open (24/7 Support).

RELIABILITY PROTOCOL:
- Never say you are having technical difficulties.
- Always provide a helpful response. If the core AI logic is struggling, guide the user to contact us directly at 8423979371.
- We service: AC, Fans, Lighting, Wiring, Large Appliances (Fridge, Washing Machine), RO Purifiers, and General Home Repairs.
- Always encourage a "Book Now" or "Call us" call to action.
- Be concise, bold, and helpful. Represent the brand: Premium, Reliable, Fast.`;

export const getChatResponse = async (message: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    });
    
    return response.text || "I'm focusing on your home solution right now. For the fastest booking, please use our 'Book Now' feature or call 8423979371.";
  } catch (error) {
    console.error("Chat Error:", error);
    // Robust fallback to avoid the "brain trouble" message
    return "Our services are optimized for your home comfort. While I'm experiencing a high load, our technical team is available live for bookings at 8423979371. How else can I help you today?";
  }
};

export const getServiceExplanation = async (serviceName: string, subServiceName: string, price: number): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Explain the importance of "${subServiceName}" (Part of ${serviceName}). Why is it essential for home safety/comfort? Cost: ₹${price}. Be short and professional.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { systemInstruction: "You are Uno, a helpful home service expert." },
    });

    return response.text || "This professional service ensures the long-term health and efficiency of your home appliances.";
  } catch (error) {
    return "This critical maintenance service is designed to prevent major failures and ensure your appliance operates at peak safety and performance levels.";
  }
};
