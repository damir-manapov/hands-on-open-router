import { OpenRouterClient } from '../src/index.js';

const apiKey = process.env['OPENROUTER_API_KEY'];
if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY environment variable is not set');
  process.exit(1);
}

const client = new OpenRouterClient({
  apiKey,
});

// Example 1: Generate ideas, then evaluate them
console.log('Example 1: Idea Generation → Evaluation');
console.log('Step 1: Generating product ideas...\n');

const ideas = await client.complete('Generate 3 innovative product ideas for a tech startup');
console.log('Generated Ideas:');
console.log(ideas);
console.log('\n' + '-'.repeat(60) + '\n');

console.log('Step 2: Evaluating ideas...\n');
const evaluation = await client.chat([
  {
    role: 'system',
    content:
      'You are a business analyst. Evaluate product ideas based on feasibility, market potential, and innovation.',
  },
  {
    role: 'user',
    content: `Evaluate these product ideas:\n\n${ideas}\n\nRank them and provide pros/cons for each.`,
  },
]);

console.log('Evaluation:');
console.log(evaluation);

console.log('\n' + '='.repeat(60) + '\n');

// Example 2: Summarize, then translate
console.log('Example 2: Summarization → Translation');
console.log('Step 1: Summarizing text...\n');

const longText = `Artificial Intelligence has transformed numerous industries. Machine learning algorithms 
process vast amounts of data, identify patterns, and make predictions. In healthcare, AI assists in 
diagnosing diseases. In finance, it powers fraud detection. The transportation sector benefits from 
autonomous vehicles.`;

const summary = await client.chat([
  {
    role: 'system',
    content: 'You are an expert at summarizing text. Provide concise summaries.',
  },
  {
    role: 'user',
    content: `Summarize this text in 2 sentences:\n\n${longText}`,
  },
]);

console.log('Summary:', summary);
console.log('\n' + '-'.repeat(60) + '\n');

console.log('Step 2: Translating summary...\n');
const translation = await client.chat([
  {
    role: 'system',
    content: 'You are a professional translator.',
  },
  {
    role: 'user',
    content: `Translate this summary to Spanish:\n\n${summary}`,
  },
]);

console.log('Translation:', translation);
