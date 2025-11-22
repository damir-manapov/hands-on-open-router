import { OpenRouterClient } from '../src/index.js';

const apiKey = process.env['OPENROUTER_API_KEY'];
if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY environment variable is not set');
  process.exit(1);
}

const client = new OpenRouterClient({
  apiKey,
});

const prompts = ['Hello', 'How are you?', 'What is TypeScript?'];

console.log('Processing prompts in parallel...\n');

const responses = await Promise.all(prompts.map((prompt) => client.complete(prompt)));

responses.forEach((response, i) => {
  console.log(`Q: ${prompts[i]}`);
  console.log(`A: ${response}\n`);
});
