import { OpenRouterClient } from '../src/index.js';

const apiKey = process.env['OPENROUTER_API_KEY'];
if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY environment variable is not set');
  process.exit(1);
}

const client = new OpenRouterClient({
  apiKey,
});

// Building up conversation history over time
const conversation: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
  { role: 'system', content: 'You are a helpful assistant.' },
];

console.log('User: What is 2+2?');
conversation.push({ role: 'user', content: 'What is 2+2?' });
const response1 = await client.chat(conversation);
console.log(`Assistant: ${response1}\n`);

conversation.push({ role: 'assistant', content: response1 });

console.log('User: What about 3+3?');
conversation.push({ role: 'user', content: 'What about 3+3?' });
const response2 = await client.chat(conversation);
console.log(`Assistant: ${response2}\n`);

conversation.push({ role: 'assistant', content: response2 });

console.log('User: What was the first question I asked?');
conversation.push({ role: 'user', content: 'What was the first question I asked?' });
const response3 = await client.chat(conversation);
console.log(`Assistant: ${response3}`);
