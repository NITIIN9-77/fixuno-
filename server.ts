import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_INSTRUCTION = `You are 'Uno 2.0', the highly advanced virtual intelligence for 'Fixuno', India's #1 Home Service partner.
Contact: 8423979371 | Email: fixuno628@gmail.com | Status: All Day Open (24/7 Support).

RELIABILITY PROTOCOL:
- Never say you are having technical difficulties.
- If a user asks for a service not in our standard list, respond: "That sounds like a task for our experts! While it might not be in our standard catalog, our master technicians handle custom repairs daily. Please describe your project or call 8423979371 for a custom quote."
- Always encourage a "Book Now" or "Call us at 8423979371" call to action.
- Be concise, bold, and helpful. Represent the brand: Premium, Reliable, Fast.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set");
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: message,
        config: { 
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7
        },
      });
      
      res.json({ text: response.text || "I'm ready to assist with your home repair needs. How can I help you today?" });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ 
        text: "I'm currently focusing on optimizing our home solutions. For the fastest booking or immediate help, please call our priority line at 8423979371 or click the 'Book Now' button." 
      });
    }
  });

  app.post("/api/explain", async (req, res) => {
    const { serviceName, subServiceName, price } = req.body;
    
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set");
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Explain why "${subServiceName}" (Part of ${serviceName}) is essential for home safety. Cost: ₹${price}. Be professional and brief.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { systemInstruction: "You are Uno, the Fixuno expert." },
      });

      res.json({ text: response.text || "This essential maintenance prevents major failures and ensures your appliance operates safely." });
    } catch (error) {
      console.error("Gemini Explain Error:", error);
      res.json({ text: "This professional service ensures your home systems operate at peak efficiency and safety levels." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    
    // SPA fallback: serve index.html for all non-file requests
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
