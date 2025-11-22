import { OpenRouterClient } from '../src/index.js';

const apiKey = process.env['OPENROUTER_API_KEY'];
if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY environment variable is not set');
  process.exit(1);
}

const client = new OpenRouterClient({
  apiKey,
});

const longText = `Artificial Intelligence (AI) has revolutionized numerous industries, from healthcare to finance, 
transforming how we work and interact with technology. Machine learning algorithms can now process vast amounts 
of data, identify patterns, and make predictions with remarkable accuracy. In healthcare, AI assists in diagnosing 
diseases, analyzing medical images, and developing personalized treatment plans. In finance, it powers fraud detection, 
algorithmic trading, and risk assessment. The transportation sector benefits from autonomous vehicles and traffic 
optimization systems. Despite these advances, challenges remain, including ethical concerns, data privacy issues, 
and the need for transparency in AI decision-making processes.`;

const response = await client.chat([
  {
    role: 'system',
    content: 'You are an expert at summarizing text. Provide concise summaries.',
  },
  {
    role: 'user',
    content: `Summarize this article in 3 sentences:\n\n${longText}`,
  },
]);

console.log('Summary:');
console.log(response);
