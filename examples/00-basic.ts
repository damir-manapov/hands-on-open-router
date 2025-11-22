import { OpenRouterClient } from '../src/index.js';

async function main() {
  const apiKey = process.env['OPENROUTER_API_KEY'];
  if (!apiKey) {
    console.error('Error: OPENROUTER_API_KEY environment variable is not set');
    console.error('Please set it with: export OPENROUTER_API_KEY="your-api-key"');
    process.exit(1);
  }

  const client = new OpenRouterClient({
    apiKey,
  });

  try {
    console.log('Sending request to OpenRouter...\n');
    const response = await client.complete('Say hello in a friendly way!');
    console.log('Response:', response);
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
