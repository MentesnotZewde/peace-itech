import { getApprovedKnowledgeText, getRelevantLinks } from "@/lib/ai/company-knowledge";
import { getAssistantInstructions } from "@/lib/ai/instructions";
import { checkRateLimit } from "@/lib/ai/rate-limit";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 900;
const MAX_HISTORY_MESSAGES = 10;
const OPENAI_TIMEOUT_MS = 20_000;
const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";

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

function getOutputText(response) {
  if (typeof response.output_text === "string") {
    return response.output_text.trim();
  }

  const chunks = [];
  for (const item of response.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) {
        chunks.push(content.text);
      }
    }
  }

  return chunks.join("\n").trim();
}

function buildOpenAIInput(messages) {
  const transcript = messages
    .map((message) => `${message.role === "assistant" ? "Assistant" : "Visitor"}: ${message.content}`)
    .join("\n");

  return [
    {
      role: "user",
      content: [
        {
          type: "input_text",
          text: [
            `Approved company knowledge:\n${getApprovedKnowledgeText()}`,
            "",
            "Conversation so far:",
            transcript,
            "",
            "Answer the visitor's latest question using only the approved company knowledge.",
          ].join("\n"),
        },
      ],
    },
  ];
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
    ? body.messages.map(cleanMessage).filter(Boolean).slice(-MAX_HISTORY_MESSAGES)
    : [];

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "Please enter a question." }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
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
  const tools = [];
  if (process.env.OPENAI_VECTOR_STORE_ID) {
    tools.push({
      type: "file_search",
      vector_store_ids: [process.env.OPENAI_VECTOR_STORE_ID],
    });
  }

  try {
    const openAIResponse = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      signal: AbortSignal.timeout(OPENAI_TIMEOUT_MS),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_ASSISTANT_MODEL || "gpt-4.1-mini",
        instructions: getAssistantInstructions(),
        input: buildOpenAIInput(messages),
        tools,
        temperature: 0.2,
        max_output_tokens: 420,
      }),
    });

    if (!openAIResponse.ok) {
      return Response.json(
        {
          error:
            "The assistant is having trouble responding right now. Please try again soon.",
        },
        { status: 502 },
      );
    }

    const data = await openAIResponse.json();
    const reply =
      getOutputText(data) ||
      "I do not have enough approved information to answer that. Please contact Peace iTech Inc and the team will help.";

    return Response.json({
      reply,
      links: getRelevantLinks(userQuestion, reply),
    });
  } catch {
    return Response.json(
      {
        error:
          "The assistant is temporarily unavailable. Please try again soon.",
      },
      { status: 500 },
    );
  }
}
