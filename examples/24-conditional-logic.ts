import { OpenRouterClient } from '../src/index.js';

const apiKey = process.env['OPENROUTER_API_KEY'];
if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY environment variable is not set');
  process.exit(1);
}

const client = new OpenRouterClient({
  apiKey,
});

// Example 1: Intent classification with conditional handling
async function handleUserQuery(query: string) {
  console.log(`User query: "${query}"\n`);

  // Classify intent
  const intentResponse = await client.complete(
    `Classify this query into one category: weather, search, chat, or other.\n\nQuery: "${query}"\n\nRespond with only the category name.`
  );
  const intent = intentResponse.trim().toLowerCase();

  console.log(`Detected intent: ${intent}\n`);

  // Handle based on intent
  if (intent.includes('weather')) {
    console.log('→ Handling weather query...');
    const response = await client.complete(
      `Provide a brief weather forecast for today. Be creative but realistic.`
    );
    console.log(`Weather: ${response}`);
  } else if (intent.includes('search')) {
    console.log('→ Handling search query...');
    const response = await client.complete(
      `Perform a search for: "${query}". Provide a brief summary of what you would find.`
    );
    console.log(`Search results: ${response}`);
  } else if (intent.includes('chat')) {
    console.log('→ Handling chat query...');
    const response = await client.complete(query);
    console.log(`Chat response: ${response}`);
  } else {
    console.log('→ Handling other query...');
    const response = await client.complete(`Answer this question: ${query}`);
    console.log(`Answer: ${response}`);
  }
}

console.log('Example 1: Intent-Based Routing\n');
await handleUserQuery('What is the weather like today?');
console.log('\n' + '='.repeat(60) + '\n');

await handleUserQuery('Tell me a joke');
