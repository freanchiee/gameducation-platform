import OpenAI from 'openai';

/**
 * Singleton OpenAI client. Instantiated lazily so local builds and tests can run
 * without an API key until an AI endpoint is actually called.
 * Server-side only: OPENAI_API_KEY must never be set as a NEXT_PUBLIC_* variable.
 */
let client: OpenAI | null = null;

export function getOpenAIClient() {
  if (client) return client;

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY environment variable.');
  }

  client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  return client;
}

export function getOpenAIModel() {
  return process.env.OPENAI_MODEL ?? 'gpt-4o-mini';
}
