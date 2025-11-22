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
    content:
      'You are a helpful assistant. Always respond with valid JSON only, no additional text.',
  },
  {
    role: 'user',
    content:
      'Extract name, age, and city from: "John is 30 years old and lives in New York". Return as JSON with keys: name, age, city',
  },
]);

try {
  const data = JSON.parse(response);
  console.log('Extracted data:');
  console.log(JSON.stringify(data, null, 2));
} catch (error) {
  console.error('Failed to parse JSON:', response);
  console.error('Error:', error instanceof Error ? error.message : error);
}
