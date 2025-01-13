import axios from "axios";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const axiosInstance = axios.create({
  baseURL: GEMINI_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAIResponse = async (userInput) => {
  try {
    console.log("Sending request to Gemini API...");
    const response = await axiosInstance.post(
      `?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: userInput }],
          },
        ],
      }
    );

    // Debugging: Log the entire API response to understand its structure.
    console.log("API Response:", response.data);

    // Extracting the AI-generated response
    if (
      response.data &&
      response.data.candidates &&
      response.data.candidates.length > 0 &&
      response.data.candidates[0].content &&
      response.data.candidates[0].content.parts &&
      response.data.candidates[0].content.parts.length > 0
    ) {
      const aiResponse =
        response.data.candidates[0].content.parts[0].text || "No valid response text.";
      return aiResponse;
    }

    throw new Error("No valid response found in the API response.");

  } catch (error) {
    console.error("Error fetching AI response:", error.message);
    return "I'm sorry, I couldn't understand that.";
  }
};
