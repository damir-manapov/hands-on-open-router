import { OpenRouterClient } from '../src/index.js';

const apiKey = process.env['OPENROUTER_API_KEY'];
if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY environment variable is not set');
  process.exit(1);
}

const client = new OpenRouterClient({
  apiKey,
});

const context = `The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. 
It is named after the engineer Gustave Eiffel, whose company designed and built the tower. Constructed from 1887 
to 1889 as the centerpiece of the 1889 World's Fair, it was initially criticized by some of France's leading 
artists and intellectuals for its design, but it has become a global cultural icon of France and one of the most 
recognizable structures in the world. The tower is 330 meters (1,083 ft) tall, about the same height as an 81-storey 
building, and the tallest structure in Paris.`;

const questions = [
  'When was the Eiffel Tower built?',
  'Who designed the Eiffel Tower?',
  'How tall is the Eiffel Tower?',
];

for (const question of questions) {
  const response = await client.chat([
    {
      role: 'system',
      content:
        'Answer questions based only on the provided context. If the answer is not in the context, say "Not found in context."',
    },
    {
      role: 'user',
      content: `Context: ${context}\n\nQuestion: ${question}`,
    },
  ]);

  console.log(`Q: ${question}`);
  console.log(`A: ${response}\n`);
}
