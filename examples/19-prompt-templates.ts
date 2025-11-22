import { OpenRouterClient } from '../src/index.js';

const apiKey = process.env['OPENROUTER_API_KEY'];
if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY environment variable is not set');
  process.exit(1);
}

const client = new OpenRouterClient({
  apiKey,
});

function createReviewPrompt(product: string, review: string): string {
  return `Review this ${product} review: "${review}"\n\nExtract and return:\n- Rating (1-5)\n- Sentiment (positive/negative/neutral)\n- Key points (3-5 bullet points)`;
}

function createEmailPrompt(recipient: string, topic: string, tone: string): string {
  return `Write a ${tone} email to ${recipient} about ${topic}. Keep it professional and concise.`;
}

// Example 1: Product review analysis
const review =
  'Great battery life, fast performance, but the screen could be brighter. Overall satisfied.';
const reviewPrompt = createReviewPrompt('laptop', review);
const reviewResponse = await client.complete(reviewPrompt);
console.log('Review Analysis:');
console.log(reviewResponse);
console.log('\n' + '='.repeat(60) + '\n');

// Example 2: Email generation
const emailPrompt = createEmailPrompt('John', 'project update', 'friendly');
const emailResponse = await client.complete(emailPrompt);
console.log('Generated Email:');
console.log(emailResponse);
