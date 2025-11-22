import { OpenRouterClient } from '../src/index.js';

const apiKey = process.env['OPENROUTER_API_KEY'];
if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY environment variable is not set');
  process.exit(1);
}

const client = new OpenRouterClient({
  apiKey,
});

// Use Claude for this specific request
const response = await client.complete('Explain quantum computing', 'anthropic/claude-3-opus');
console.log(response);
