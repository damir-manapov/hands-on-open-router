import { OpenRouterClient } from '../src/index.js';

const apiKey = process.env['OPENROUTER_API_KEY'];
if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY environment variable is not set');
  process.exit(1);
}

const client = new OpenRouterClient({
  apiKey,
});

const prompt = 'Explain quantum computing in simple terms';
const models = [
  'openai/gpt-3.5-turbo',
  'anthropic/claude-3-haiku',
  'meta-llama/llama-3.1-8b-instruct',
];

console.log(`Prompt: ${prompt}\n`);
console.log('='.repeat(60));

for (const model of models) {
  console.log(`\nModel: ${model}`);
  console.log('-'.repeat(60));
  const response = await client.complete(prompt, model);
  console.log(response);
}
