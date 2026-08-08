import {
  getApprovedKnowledgeText,
  getRelevantLinks,
} from "@/lib/ai/company-knowledge";
import { getAssistantInstructions } from "@/lib/ai/instructions";
import { checkRateLimit } from "@/lib/ai/rate-limit";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 900;
const MAX_HISTORY_MESSAGES = 10;
const GEMINI_TIMEOUT_MS = 20_000;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function cleanMessage(message) {
  if (!message || typeof message.content !== "string") return null;
  const role = message.role === "assistant" ? "assistant" : "user";
  const content = message.content.trim().slice(0, MAX_MESSAGE_LENGTH);
  if (!content) return null;
  return { role, content };
}

// Gemini uses "model" instead of "assistant", and a "contents" array
// instead of OpenAI's "messages"/"input" shape.
function buildGeminiContents(messages) {
  return messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));
}

function getOutputText(response) {
  const candidate = response?.candidates?.[0];
  const parts = candidate?.content?.parts || [];
  return parts
    .map((part) => part.text || "")
    .join("\n")
    .trim();
}

export async function POST(request) {
  const rateLimit = checkRateLimit(getClientIp(request));

  if (!rateLimit.allowed) {
    return Response.json(
      {
        error:
          "Too many assistant requests right now. Please wait a moment and try again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfter || 60),
        },
      },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = Array.isArray(body?.messages)
    ? body.messages
        .map(cleanMessage)
        .filter(Boolean)
        .slice(-MAX_HISTORY_MESSAGES)
    : [];

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return Response.json(
      { error: "Please enter a question." },
      { status: 400 },
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error:
          "The AI assistant is not connected yet. Please contact Peace iTech Inc directly while we finish setup.",
      },
      { status: 503 },
    );
  }

  const userQuestion = messages[messages.length - 1].content;

  // Gemini takes the "system" role separately from the conversation turns.
  const systemInstruction = {
    parts: [
      {
        text: [
          getAssistantInstructions(),
          "",
          `Approved company knowledge:\n${getApprovedKnowledgeText()}`,
          "",
          "Answer the visitor's latest question using only the approved company knowledge above.",
        ].join("\n"),
      },
    ],
  };

  try {
    const geminiResponse = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      signal: AbortSignal.timeout(GEMINI_TIMEOUT_MS),
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: buildGeminiContents(messages),
        systemInstruction,
        generationConfig: {
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errBody = await geminiResponse.text();
      console.error("Gemini API error:", geminiResponse.status, errBody);

      return Response.json(
        {
          error:
            "The assistant is having trouble responding right now. Please try again soon.",
        },
        { status: 502 },
      );
    }

    const data = await geminiResponse.json();
    const finishReason = data?.candidates?.[0]?.finishReason;
    if (finishReason && finishReason !== "STOP") {
      console.warn("Gemini finished early:", finishReason);
    }

    const reply =
      getOutputText(data) ||
      "I do not have enough approved information to answer that. Please contact Peace iTech Inc and the team will help.";

    return Response.json({
      reply,
      links: getRelevantLinks(userQuestion, reply),
    });
  } catch (err) {
    console.error("Assistant route error:", err);
    return Response.json(
      {
        error:
          "The assistant is temporarily unavailable. Please try again soon.",
      },
      { status: 500 },
    );
  }
}
