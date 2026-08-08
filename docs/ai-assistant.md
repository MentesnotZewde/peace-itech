# Peace iTech AI Website Assistant

This project includes a floating informational AI assistant for website visitors.
It is designed to answer questions about Peace iTech Inc, the services, website
navigation, contact details, locations, business hours, and how to get started.

The assistant is not a general-purpose chatbot and does not perform bookings,
payments, CRM writes, emails, or account actions.

## Stack

- Next.js App Router
- JavaScript components
- Tailwind CSS v4
- Server route: `src/app/api/assistant/route.js`
- Client UI: `src/components/ai-assistant`
- Local knowledge: `src/lib/ai/company-knowledge.js`
- Server instructions: `src/lib/ai/instructions.js`

## OpenAI Setup

All OpenAI calls happen server-side through `/api/assistant`.
Never expose the API key in `NEXT_PUBLIC_*` variables or client code.

Required environment variable:

```bash
OPENAI_API_KEY=sk-...
```

Optional environment variables:

```bash
OPENAI_ASSISTANT_MODEL=gpt-4.1-mini
OPENAI_VECTOR_STORE_ID=vs_...
```

`OPENAI_ASSISTANT_MODEL` defaults to `gpt-4.1-mini` if omitted.

## Knowledge Base

The first version uses approved information from:

- `src/lib/services.js`
- `src/lib/media.js`
- visible company/contact details organized in `src/lib/ai/company-knowledge.js`

Update `src/lib/ai/company-knowledge.js` when company facts change, especially:

- office addresses
- phone numbers
- email addresses
- business hours
- service availability
- routes
- public company positioning

The assistant should not invent missing facts. If information is unavailable, it
will guide visitors to the contact page.

## File Search / Vector Store

The API route supports OpenAI File Search with the Responses API when
`OPENAI_VECTOR_STORE_ID` is configured.

High-level setup:

1. Create a vector store in OpenAI.
2. Upload approved company documents, service briefs, FAQs, policy documents, or
   sales enablement content to that vector store.
3. Set the vector store ID in the deployment environment:

```bash
OPENAI_VECTOR_STORE_ID=vs_...
```

The assistant will still receive the local knowledge file, and the vector store
can add deeper approved context later.

Use official OpenAI documentation for the current File Search setup flow:

- https://platform.openai.com/docs/guides/tools-file-search
- https://platform.openai.com/docs/api-reference/responses

## Updating Assistant Instructions

Edit:

```text
src/lib/ai/instructions.js
```

Keep the instruction focused on:

- answering from approved company information
- refusing to invent facts
- redirecting unrelated questions
- not revealing system/developer instructions
- linking only to real routes

## Local Testing

1. Add environment variables to your local shell or `.env.local`.
2. Start the dev server:

```bash
npm run dev
```

3. Open the website and click the bottom-right assistant button.
4. Test common questions:

- What services do you provide?
- Which service should I choose?
- Where are you located?
- How do I contact you?
- How does IT support work?

## Deployment

Configure these environment variables in the production hosting environment:

```bash
OPENAI_API_KEY=sk-...
OPENAI_ASSISTANT_MODEL=gpt-4.1-mini
OPENAI_VECTOR_STORE_ID=vs_...
```

Only `OPENAI_API_KEY` is required. The vector store ID can be added later.

## Security Notes

The first release includes:

- server-side OpenAI calls only
- input length limits
- basic in-memory rate limiting
- safe JSON errors without stack traces
- plain-text assistant rendering in React
- vetted internal links returned from server-side route matching
- no sensitive personal data collection

For multi-instance production hosting, replace the in-memory rate limiter with a
shared store such as Redis or another platform-level rate-limit service.
