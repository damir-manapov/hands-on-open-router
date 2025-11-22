import OpenAI from 'openai';

const apiKey = process.env['OPENROUTER_API_KEY'];
if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY environment variable is not set');
  process.exit(1);
}

// Create OpenAI client directly to access usage information
const openaiClient = new OpenAI({
  apiKey,
  baseURL: 'https://openrouter.ai/api/v1',
});

interface UsageStats {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCost?: number;
}

// Model pricing per 1M tokens (example prices, adjust based on actual OpenRouter pricing)
const MODEL_PRICING: Record<string, { input: number; output: number }> = {
  'openai/gpt-3.5-turbo': { input: 0.5, output: 1.5 },
  'openai/gpt-4': { input: 30, output: 60 },
  'anthropic/claude-3-haiku': { input: 0.25, output: 1.25 },
  'anthropic/claude-3-opus': { input: 15, output: 75 },
};

function calculateCost(model: string, promptTokens: number, completionTokens: number): number {
  const pricing = MODEL_PRICING[model] ?? MODEL_PRICING['openai/gpt-3.5-turbo']!;
  const inputCost = (promptTokens / 1_000_000) * pricing.input;
  const outputCost = (completionTokens / 1_000_000) * pricing.output;
  return inputCost + outputCost;
}

async function completeWithTracking(
  prompt: string,
  model = 'openai/gpt-3.5-turbo'
): Promise<{ response: string; usage: UsageStats }> {
  const response = await openaiClient.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No content in response');
  }

  const usage = response.usage;
  if (!usage) {
    throw new Error('No usage information in response');
  }

  const usageStats: UsageStats = {
    promptTokens: usage.prompt_tokens,
    completionTokens: usage.completion_tokens,
    totalTokens: usage.total_tokens,
    estimatedCost: calculateCost(model, usage.prompt_tokens, usage.completion_tokens),
  };

  return { response: content, usage: usageStats };
}

// Example 1: Track single request
console.log('Example 1: Single Request Cost Tracking\n');
const result1 = await completeWithTracking('Explain quantum computing in simple terms');
console.log('Response:', result1.response.substring(0, 100) + '...\n');
console.log('Usage Stats:');
console.log(`  Prompt tokens: ${result1.usage.promptTokens}`);
console.log(`  Completion tokens: ${result1.usage.completionTokens}`);
console.log(`  Total tokens: ${result1.usage.totalTokens}`);
console.log(`  Estimated cost: $${result1.usage.estimatedCost?.toFixed(6)}`);

console.log('\n' + '='.repeat(60) + '\n');

// Example 2: Track multiple requests and aggregate
console.log('Example 2: Aggregate Cost Tracking\n');

const prompts = ['Say hello', 'What is TypeScript?', 'Write a haiku about coding'];

let totalTokens = 0;
let totalCost = 0;

for (const prompt of prompts) {
  const result = await completeWithTracking(prompt);
  totalTokens += result.usage.totalTokens;
  totalCost += result.usage.estimatedCost || 0;
  console.log(
    `"${prompt}": ${result.usage.totalTokens} tokens, $${result.usage.estimatedCost?.toFixed(6)}`
  );
}

console.log(`\nTotal: ${totalTokens} tokens, $${totalCost.toFixed(6)}`);

console.log('\n' + '='.repeat(60) + '\n');

// Example 3: Compare costs across models
console.log('Example 3: Cost Comparison Across Models\n');

const testPrompt = 'Explain what AI is in one sentence';
const models = ['openai/gpt-3.5-turbo', 'openai/gpt-4', 'anthropic/claude-3-haiku'];

for (const model of models) {
  const result = await completeWithTracking(testPrompt, model);
  console.log(`${model}:`);
  console.log(`  Tokens: ${result.usage.totalTokens}`);
  console.log(`  Cost: $${result.usage.estimatedCost?.toFixed(6)}`);
  console.log();
}
