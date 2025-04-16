import { GoogleGenerativeAI } from "@google/generative-ai";


const apikey = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apikey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const getResponse = async (prompt) => {
  try {
    const result = await model.generateContent(prompt, generationConfig);

    if(result) return result.response.text();
    return "";
  } catch (error) {
    console.log(error.message);
  }
};