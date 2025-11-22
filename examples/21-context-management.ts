import { OpenRouterClient } from '../src/index.js';

const apiKey = process.env['OPENROUTER_API_KEY'];
if (!apiKey) {
  console.error('Error: OPENROUTER_API_KEY environment variable is not set');
  process.exit(1);
}

const client = new OpenRouterClient({
  apiKey,
});

type Message = { role: 'system' | 'user' | 'assistant'; content: string };

function truncateConversation(messages: Message[], maxMessages: number): Message[] {
  // Always keep the system message if present
  const systemMessage = messages.find((m) => m.role === 'system');
  const otherMessages = messages.filter((m) => m.role !== 'system');

  // Keep the most recent messages
  const recentMessages = otherMessages.slice(-maxMessages);

  return systemMessage ? [systemMessage, ...recentMessages] : recentMessages;
}

// Simulate a long conversation
let conversation: Message[] = [{ role: 'system', content: 'You are a helpful assistant.' }];

// Add many messages
for (let i = 1; i <= 10; i++) {
  conversation.push({ role: 'user', content: `Question ${i}: What is ${i} + ${i}?` });
  const response = await client.chat(conversation);
  conversation.push({ role: 'assistant', content: response });
}

console.log(`Full conversation has ${conversation.length} messages\n`);

// Truncate to keep only last 4 messages (plus system)
const truncated = truncateConversation(conversation, 4);
console.log(`Truncated conversation has ${truncated.length} messages`);
console.log('Last messages:');
truncated.slice(-3).forEach((msg) => {
  console.log(`  ${msg.role}: ${msg.content.substring(0, 50)}...`);
});
