require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");

const lawProbeAiRouter = Router();

// Route to handle question submission
lawProbeAiRouter.post("/generate-response", async (req, res) => {
  const apiKey = process.env.API_KEY; 
  const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

  if (!apiKey) {
    console.error("API Key is missing in the .env file.");
    return res.status(500).json({ error: "API key configuration error" });
  }

  try {
    const { question } = req.body;

    if (typeof question !== "string" || question.trim() === "") {
      return res.status(400).json({ error: "Invalid or empty question provided" });
    }
    const requiredQuestion = `Provide the answer in a well-structured format, with each relevant section categorized under applicable Indian laws. Include sections like IPC, CrPC, CPC, IDA, IEA, and others as relevant. The response should be concise, point-wise, and summarized, covering all necessary details. Insert a <br> tag after each point to ensure clear separation. If user initiated an introduction with you reply accordingly. Here is the question: ${question}`;
    const payload = {
      contents: [
        {
          parts: [{ text: requiredQuestion }],
        },
      ],
    };

    const response = await axios.post(
      `${endpoint}?key=${apiKey}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Respond with the content from the API
    res.status(200).json({ response: response.data });
  } catch (error) {
    console.error("Error message:", error.message);
    console.error("Error response:", error.response?.data || "No response data");
    res.status(500).json({ error: "An error occurred while generating response" });
  }
});

module.exports = {
  lawProbeAiRouter,
};
