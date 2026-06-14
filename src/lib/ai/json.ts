import { getOpenAIClient, getOpenAIModel } from './provider';

interface JsonCallOptions {
  schemaName: string;
  schema: Record<string, unknown>;
  system: string;
  user: unknown;
  strict?: boolean;
}

export async function generateJson<T>(options: JsonCallOptions): Promise<T> {
  const openai = getOpenAIClient();
  const response = await openai.chat.completions.create({
    model: getOpenAIModel(),
    temperature: 0.2,
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: options.schemaName,
        strict: options.strict ?? true,
        schema: options.schema,
      },
    },
    messages: [
      {
        role: 'system',
        content: `${options.system}\nReturn JSON only, matching the supplied schema.`,
      },
      {
        role: 'user',
        content: JSON.stringify(options.user),
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('OpenAI returned an empty response.');
  }

  return JSON.parse(content) as T;
}
