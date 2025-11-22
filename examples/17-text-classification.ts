import { OpenRouterClient } from '../src/index.js';

const apiKey = process.env['OPENROUTER_API_KEY'];
if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY environment variable is not set');
  process.exit(1);
}

const client = new OpenRouterClient({
  apiKey,
});

const texts = [
  'I love this product! It works perfectly.',
  'This is terrible. Complete waste of money.',
  'The product arrived on time and looks good.',
];

for (const text of texts) {
  const response = await client.chat([
    {
      role: 'system',
      content:
        'Classify text sentiment as: positive, negative, or neutral. Respond with only the classification.',
    },
    {
      role: 'user',
      content: `Classify: "${text}"`,
    },
  ]);

  console.log(`Text: "${text}"`);
  console.log(`Classification: ${response}\n`);
}
