import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const isValidJSON = (text) => {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
};

export const getResponse = async (prompt, retry = true) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.2,        // VERY IMPORTANT
        maxOutputTokens: 4096,   // VERY IMPORTANT
      },
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    // Remove accidental markdown fences if any
    const cleaned = text.replace(/```json|```/g, "").trim();

    // Validate JSON
    if (!isValidJSON(cleaned)) {
      // Retry ONCE with a stronger instruction
      if (retry) {
        return await getResponse(
          prompt +
            "\n\nIMPORTANT: Your previous response was INVALID or INCOMPLETE JSON. Regenerate the FULL JSON from scratch.",
          false
        );
      }
      return null;
    }

    return cleaned;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};
