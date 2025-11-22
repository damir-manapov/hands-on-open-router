import { OpenRouterClient } from '../src/index.js';

const apiKey = process.env['OPENROUTER_API_KEY'];
if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY environment variable is not set');
  process.exit(1);
}

const client = new OpenRouterClient({
  apiKey,
});

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateJSON(jsonString: string): boolean {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
}

// Example 1: Validate email format
console.log('Example 1: Email Validation');
try {
  const response = await client.complete('Generate a valid email address');
  const email = response.trim();
  if (validateEmail(email)) {
    console.log(`✓ Valid email: ${email}`);
  } else {
    console.error(`✗ Invalid email format: ${email}`);
  }
} catch (error) {
  console.error('Error:', error instanceof Error ? error.message : error);
}

console.log('\n' + '='.repeat(60) + '\n');

// Example 2: Validate JSON response
console.log('Example 2: JSON Validation');
try {
  const response = await client.chat([
    {
      role: 'system',
      content: 'You are a helpful assistant. Always respond with valid JSON only.',
    },
    {
      role: 'user',
      content: 'Return a JSON object with keys: name, age, city',
    },
  ]);

  if (validateJSON(response)) {
    const data = JSON.parse(response);
    console.log('✓ Valid JSON:', JSON.stringify(data, null, 2));
  } else {
    console.error('✗ Invalid JSON format:', response);
  }
} catch (error) {
  console.error('Error:', error instanceof Error ? error.message : error);
}

console.log('\n' + '='.repeat(60) + '\n');

// Example 3: Validate response length
console.log('Example 3: Response Length Validation');
try {
  const response = await client.complete('Say hello');
  const minLength = 5;
  const maxLength = 100;

  if (response.length < minLength) {
    console.error(`✗ Response too short: ${response.length} characters (minimum: ${minLength})`);
  } else if (response.length > maxLength) {
    console.error(`✗ Response too long: ${response.length} characters (maximum: ${maxLength})`);
  } else {
    console.log(`✓ Valid length: ${response.length} characters`);
    console.log(`Response: ${response}`);
  }
} catch (error) {
  console.error('Error:', error instanceof Error ? error.message : error);
}
