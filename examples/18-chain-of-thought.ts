import { OpenRouterClient } from '../src/index.js';

const apiKey = process.env['OPENROUTER_API_KEY'];
if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY environment variable is not set');
  process.exit(1);
}

const client = new OpenRouterClient({
  apiKey,
});

const problems = [
  'If a train travels 60 mph for 2 hours, how far does it go?',
  'A store has 120 apples. They sell 45 in the morning and 30 in the afternoon. How many are left?',
];

for (const problem of problems) {
  const response = await client.chat([
    {
      role: 'system',
      content:
        'Think step by step and show your reasoning. Break down the problem into smaller parts.',
    },
    {
      role: 'user',
      content: problem,
    },
  ]);

  console.log(`Problem: ${problem}`);
  console.log(`Solution:\n${response}\n`);
  console.log('='.repeat(60) + '\n');
}
