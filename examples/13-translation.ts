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
    content: 'You are a professional translator.',
  },
  {
    role: 'user',
    content:
      'Translate "Hello, how are you?" to Spanish, French, and German. List each translation on a separate line.',
  },
]);

console.log(response);
