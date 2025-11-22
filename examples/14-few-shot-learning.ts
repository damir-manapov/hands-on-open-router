import { OpenRouterClient } from '../src/index.js';

const apiKey = process.env['OPENROUTER_API_KEY'];
if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY environment variable is not set');
  process.exit(1);
}

const client = new OpenRouterClient({
  apiKey,
});

const response = await client.chat([
  {
    role: 'system',
    content: 'You are a helpful assistant that learns from examples.',
  },
  {
    role: 'user',
    content:
      'Example 1: "happy" -> positive\nExample 2: "sad" -> negative\nExample 3: "angry" -> negative\nNow classify: "excited"',
  },
]);

console.log('Classification:', response);
