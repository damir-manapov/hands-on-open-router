import { OpenRouterClient } from '../src/index.js';

const apiKey = process.env['OPENROUTER_API_KEY'];
if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY environment variable is not set');
  process.exit(1);
}

const client = new OpenRouterClient({
  apiKey,
});

try {
  const response = await client.complete('Hello!');
  console.log(response);
} catch (error) {
  console.error('Error:', error instanceof Error ? error.message : error);
}
