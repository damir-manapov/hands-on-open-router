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
    content: 'You are an expert programmer. Write clean, well-commented code.',
  },
  {
    role: 'user',
    content:
      'Write a TypeScript function that calculates fibonacci numbers. Include type annotations and comments.',
  },
]);

console.log(response);
