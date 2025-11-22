import { OpenRouterClient } from '../src/index.js';

const apiKey = process.env['OPENROUTER_API_KEY'];
if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY environment variable is not set');
  process.exit(1);
}

const client = new OpenRouterClient({
  apiKey,
  defaultModel: 'anthropic/claude-3-opus', // All requests use this by default
});

const response = await client.complete('Write a haiku about coding');
console.log(response);
