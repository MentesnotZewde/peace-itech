"use client";

import Link from "next/link";
import { ArrowRight, Bot, Loader2, Send, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const starterActions = [
  {
    label: "Explore Services",
    prompt: "What services does Peace iTech Inc provide?",
  },
  { label: "About Us", prompt: "Who is Peace iTech Inc?" },
  {
    label: "How It Works",
    prompt: "How does Peace iTech Inc work with clients?",
  },
  { label: "Contact Us", prompt: "How can I contact Peace iTech Inc?" },
];

const initialMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm the Peace iTech Inc virtual assistant. I can help you learn about our services, company, locations, and how to get started.",
  links: [
    { label: "Explore Services", href: "/#services" },
    { label: "Contact Us", href: "/contact" },
  ],
};

function createMessage(role, content, links = []) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
    links,
  };
}

function AssistantMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[86%] rounded-[1rem] px-4 py-3 text-sm leading-6 shadow-sm ${
          isUser
            ? "bg-[#005BFF] text-white"
            : "border border-[#005BFF]/10 bg-white/82 text-foreground dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/86"
        }`}
      >
        {message.content.split("\n").map((line, index) => (
          <p key={`${message.id}-${index}`} className={index ? "mt-2" : ""}>
            {line}
          </p>
        ))}

        {!isUser && message.links?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1 rounded-full border border-[#005BFF]/16 bg-[#005BFF]/7 px-3 py-1.5 text-xs font-semibold text-[#005BFF] transition hover:border-[#005BFF]/36 hover:bg-[#005BFF]/12 dark:border-[#12B7FF]/20 dark:bg-[#12B7FF]/10 dark:text-[#12B7FF]"
              >
                {link.label}
                <ArrowRight className="size-3" aria-hidden="true" />
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function AssistantPanel({ onClose }) {
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const requestMessages = useMemo(
    () =>
      messages
        .filter((message) => message.id !== "welcome")
        .map((message) => ({
          role: message.role,
          content: message.content,
        })),
    [messages],
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading, error]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  async function submitMessage(nextInput = input) {
    const content = nextInput.trim();
    if (!content || isLoading) return;

    const userMessage = createMessage("user", content);
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...requestMessages, { role: "user", content }],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "The assistant could not respond.");
      }

      setMessages((current) => [
        ...current,
        createMessage("assistant", data.reply, data.links || []),
      ]);
    } catch (caughtError) {
      setError(
        caughtError?.message ||
          "The assistant is temporarily unavailable. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitMessage();
  }

  function handleStarterClick(prompt) {
    submitMessage(prompt);
  }

  return (
    <div
      className="fixed inset-0 z-[130] flex items-end bg-[#020817]/36 p-0 backdrop-blur-sm sm:inset-auto sm:bottom-6 sm:right-6 sm:bg-transparent sm:p-0 sm:backdrop-blur-0"
      role="dialog"
      aria-modal="true"
      aria-label="Peace iTech AI assistant"
    >
      <div className="flex h-[100dvh] w-full flex-col overflow-hidden border border-[#005BFF]/12 bg-background shadow-2xl shadow-[#005BFF]/18 dark:border-[#12B7FF]/16 sm:h-[min(43rem,calc(100vh-3rem))] sm:w-[min(26rem,calc(100vw-2rem))] sm:rounded-[1.5rem]">
        <header className="flex items-center justify-between gap-4 border-b border-border/70 bg-background/92 px-4 py-4 backdrop-blur-xl">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#005BFF] text-white shadow-[0_14px_34px_rgba(0,91,255,0.24)] dark:bg-[#12B7FF] dark:text-[#07111F]">
              <Bot className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                Peace iTech AI Assistant
              </p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                <Sparkles
                  className="size-3 text-[#12B7FF]"
                  aria-hidden="true"
                />
                Website guide
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close AI assistant"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:ring-4 focus-visible:ring-[#12B7FF]/24"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </header>

        <div
          ref={scrollRef}
          className="flex-1 space-y-4 overflow-y-auto bg-[radial-gradient(circle_at_18%_12%,rgba(18,183,255,0.08),transparent_34%),linear-gradient(180deg,rgba(234,248,255,0.34),transparent)] px-4 py-5 dark:bg-[radial-gradient(circle_at_18%_12%,rgba(18,183,255,0.12),transparent_34%),linear-gradient(180deg,rgba(18,183,255,0.05),transparent)]"
        >
          {messages.map((message) => (
            <AssistantMessage key={message.id} message={message} />
          ))}

          {messages.length === 1 ? (
            <div className="grid grid-cols-2 gap-2">
              {starterActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => handleStarterClick(action.prompt)}
                  className="rounded-xl border border-[#005BFF]/12 bg-white/80 px-3 py-3 text-left text-xs font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-[#005BFF]/28 hover:bg-white focus-visible:ring-4 focus-visible:ring-[#12B7FF]/20 dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/76 dark:hover:border-[#12B7FF]/32"
                >
                  {action.label}
                </button>
              ))}
            </div>
          ) : null}

          {isLoading ? (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-full border border-[#005BFF]/10 bg-white/82 px-4 py-3 text-sm text-muted-foreground dark:border-[#12B7FF]/14 dark:bg-[#0B1830]/86">
                <Loader2 className="size-4 animate-spin text-[#005BFF] dark:text-[#12B7FF]" />
                Thinking
              </div>
            </div>
          ) : null}

          {error ? (
            <div className="rounded-xl border border-red-500/18 bg-red-500/8 px-4 py-3 text-sm text-red-700 dark:text-red-200">
              {error}
            </div>
          ) : null}
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-t border-border/70 bg-background/96 p-3 backdrop-blur-xl"
        >
          <label className="sr-only" htmlFor="assistant-message">
            Ask the AI assistant
          </label>
          <div className="flex items-end gap-2 rounded-[1rem] border border-[#005BFF]/14 bg-muted/40 p-2 focus-within:border-[#005BFF]/40 focus-within:ring-4 focus-within:ring-[#12B7FF]/14 dark:border-[#12B7FF]/16">
            <input
              ref={inputRef}
              id="assistant-message"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value.slice(0, 900))}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  submitMessage();
                }
              }}
              placeholder="Ask about services, contact, or how to get started..."
              className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#005BFF] text-white shadow-[0_12px_28px_rgba(0,91,255,0.24)] transition hover:bg-[#071B8F] focus-visible:ring-4 focus-visible:ring-[#12B7FF]/24 disabled:cursor-not-allowed disabled:opacity-45"
            >
              <Send className="size-4" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-2 px-1 text-[0.7rem] leading-5 text-muted-foreground">
            Informational assistant only. Please avoid sharing sensitive
            personal information.
          </p>
        </form>
      </div>
    </div>
  );
}
