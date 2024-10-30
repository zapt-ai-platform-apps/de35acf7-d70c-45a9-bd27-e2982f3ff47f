import * as Sentry from "@sentry/node";
import { authenticateUser } from "./_apiUtils.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fetch = require("node-fetch");

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: "backend",
      projectId: process.env.PROJECT_ID,
    },
  },
});

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const user = await authenticateUser(req);
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are an AI that generates HTML and CSS code for website templates based on user descriptions.",
          },
          {
            role: "user",
            content: `Create a responsive website template for: ${prompt}. Provide the full HTML and CSS code.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate website");
    }

    const data = await response.json();
    const generatedCode = data.choices[0].message.content;

    res.status(200).json({ code: generatedCode });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}