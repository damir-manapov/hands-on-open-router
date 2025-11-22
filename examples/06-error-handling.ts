import { OpenRouterClient } from '../src/index.js';

const apiKey = process.env['OPENROUTER_API_KEY'];
if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY environment variable is not set');
  process.exit(1);
}

const client = new OpenRouterClient({
  apiKey,
});

// Example 1: Invalid model name
console.log('Example 1: Invalid model name');
try {
  const response = await client.complete('Hello!', 'invalid-model-name-12345');
  console.log(response);
} catch (error) {
  console.error('Caught error:', error instanceof Error ? error.message : error);
  console.log('Error type:', error instanceof Error ? error.constructor.name : typeof error);
}

console.log('\n' + '='.repeat(60) + '\n');

// Example 2: Invalid API key (using wrong key)
console.log('Example 2: Invalid API key');
const invalidClient = new OpenRouterClient({
  apiKey: 'invalid-api-key-example-for-testing',
});
try {
  const response = await invalidClient.complete('Hello!');
  console.log(response);
} catch (error) {
  console.error('Caught error:', error instanceof Error ? error.message : error);
  console.log('Error type:', error instanceof Error ? error.constructor.name : typeof error);
}

console.log('\n' + '='.repeat(60) + '\n');

// Example 3: Successful request with proper error handling
console.log('Example 3: Successful request with error handling');
try {
  const response = await client.complete('Say hello!');
  console.log('Success:', response);
} catch (error) {
  console.error('Caught error:', error instanceof Error ? error.message : error);
}
