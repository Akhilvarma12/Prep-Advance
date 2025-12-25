import { GoogleGenerativeAI } from "@google/generative-ai";

const apikey = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apikey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 2048,
  responseMimeType: "application/json",
};

export const getResponse = async (prompt) => {
  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const text =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    // Always return a string
    return text ?? "";
  } catch (error) {
    console.error("Gemini API error:", error.message);
    return ""; // VERY IMPORTANT
  }
};
