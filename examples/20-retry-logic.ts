import { OpenRouterClient } from '../src/index.js';

const apiKey = process.env['OPENROUTER_API_KEY'];
if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY environment variable is not set');
  process.exit(1);
}

const client = new OpenRouterClient({
  apiKey,
});

async function completeWithRetry(prompt: string, maxRetries = 3, delayMs = 1000): Promise<string> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxRetries}...`);
      const response = await client.complete(prompt);
      console.log('Success!');
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`Attempt ${attempt} failed: ${errorMessage}`);

      if (attempt === maxRetries) {
        throw new Error(`Failed after ${maxRetries} attempts: ${errorMessage}`);
      }

      const waitTime = delayMs * attempt;
      console.log(`Waiting ${waitTime}ms before retry...\n`);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }

  throw new Error('Unexpected error in retry logic');
}

// Example: Normal request (will succeed on first try)
try {
  const response = await completeWithRetry('Say hello!');
  console.log(`Response: ${response}`);
} catch (error) {
  console.error('Final error:', error instanceof Error ? error.message : error);
}
