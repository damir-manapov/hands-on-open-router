# Hands-on Open Router

TypeScript client for working with LLMs through OpenRouter API.

## Quick Start

```bash
# Install dependencies
pnpm install

# Set your API key
export OPENROUTER_API_KEY='your-api-key-here'

# Run any example directly
tsx examples/00-basic.ts
tsx examples/01-simple-completion.ts
tsx examples/02-chat-with-system.ts
tsx examples/03-multi-turn.ts
tsx examples/04-different-models.ts
tsx examples/05-custom-default-model.ts
tsx examples/06-error-handling.ts
tsx examples/07-conversation-state.ts
tsx examples/08-model-comparison.ts
tsx examples/09-batch-processing.ts
tsx examples/10-structured-output.ts
tsx examples/11-role-playing.ts
tsx examples/12-code-generation.ts
tsx examples/13-translation.ts
tsx examples/14-few-shot-learning.ts
tsx examples/15-summarization.ts
tsx examples/16-qa-from-context.ts
tsx examples/17-text-classification.ts
tsx examples/18-chain-of-thought.ts
tsx examples/19-prompt-templates.ts
tsx examples/20-retry-logic.ts
tsx examples/21-context-management.ts
tsx examples/22-response-validation.ts
tsx examples/23-prompt-chaining.ts
tsx examples/24-conditional-logic.ts
```

## Examples

All examples are in the `examples/` folder. Each example is a complete, runnable script.

### Example 1: Simple Completion

```bash
tsx examples/01-simple-completion.ts
```

```typescript
import { OpenRouterClient } from '../src/index.js';

const client = new OpenRouterClient({
  apiKey: process.env['OPENROUTER_API_KEY']!,
});

const response = await client.complete('Hello, world!');
console.log(response);
```

### Example 2: Chat with System Message

```bash
tsx examples/02-chat-with-system.ts
```

```typescript
import { OpenRouterClient } from '../src/index.js';

const client = new OpenRouterClient({
  apiKey: process.env['OPENROUTER_API_KEY']!,
  defaultModel: 'openai/gpt-4',
});

const response = await client.chat([
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'What is TypeScript?' },
]);
console.log(response);
```

### Example 3: Multi-turn Conversation

```bash
tsx examples/03-multi-turn.ts
```

```typescript
import { OpenRouterClient } from '../src/index.js';

const response = await client.chat([
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'What is TypeScript?' },
  { role: 'assistant', content: 'TypeScript is a typed superset of JavaScript...' },
  { role: 'user', content: 'Tell me more about its benefits.' },
]);
```

### Example 4: Using Different Models

```bash
tsx examples/04-different-models.ts
```

```typescript
// Use Claude for this specific request
const response = await client.complete('Explain quantum computing', 'anthropic/claude-3-opus');
```

### Example 5: Custom Default Model

```bash
tsx examples/05-custom-default-model.ts
```

```typescript
const client = new OpenRouterClient({
  apiKey: process.env['OPENROUTER_API_KEY']!,
  defaultModel: 'anthropic/claude-3-opus', // All requests use this by default
});
```

### Example 6: Error Handling

```bash
tsx examples/06-error-handling.ts
```

Demonstrates how to handle various error scenarios including invalid models and API keys.

```typescript
// Invalid model name
try {
  const response = await client.complete('Hello!', 'invalid-model-name-12345');
  console.log(response);
} catch (error) {
  console.error('Caught error:', error instanceof Error ? error.message : error);
}

// Invalid API key
const invalidClient = new OpenRouterClient({
  apiKey: 'invalid-api-key-example-for-testing',
});
try {
  const response = await invalidClient.complete('Hello!');
  console.log(response);
} catch (error) {
  console.error('Caught error:', error instanceof Error ? error.message : error);
}
```

### Example 7: Conversation State Management

```bash
tsx examples/07-conversation-state.ts
```

Building up conversation history over time, maintaining context across multiple turns.

```typescript
const conversation = [{ role: 'system', content: 'You are a helpful assistant.' }];

conversation.push({ role: 'user', content: 'What is 2+2?' });
const response1 = await client.chat(conversation);
conversation.push({ role: 'assistant', content: response1 });

conversation.push({ role: 'user', content: 'What about 3+3?' });
const response2 = await client.chat(conversation);
```

### Example 8: Model Comparison

```bash
tsx examples/08-model-comparison.ts
```

Compare the same prompt across different models to see how they differ.

```typescript
const prompt = 'Explain quantum computing in simple terms';
const models = [
  'openai/gpt-3.5-turbo',
  'anthropic/claude-3-haiku',
  'meta-llama/llama-3.1-8b-instruct',
];

for (const model of models) {
  const response = await client.complete(prompt, model);
  console.log(`${model}: ${response}`);
}
```

### Example 9: Batch Processing

```bash
tsx examples/09-batch-processing.ts
```

Process multiple prompts in parallel for better performance.

```typescript
const prompts = ['Hello', 'How are you?', 'What is TypeScript?'];
const responses = await Promise.all(prompts.map((prompt) => client.complete(prompt)));
```

### Example 10: Structured Output Extraction

```bash
tsx examples/10-structured-output.ts
```

Extract structured data from text using prompts.

```typescript
const response = await client.chat([
  { role: 'system', content: 'You are a helpful assistant. Always respond with valid JSON only.' },
  {
    role: 'user',
    content: 'Extract name, age, and city from: "John is 30 years old and lives in New York"',
  },
]);
const data = JSON.parse(response);
```

### Example 11: Role-Playing Scenario

```bash
tsx examples/11-role-playing.ts
```

Create a character or scenario with a custom personality.

```typescript
const response = await client.chat([
  { role: 'system', content: 'You are a pirate captain. Speak like a pirate and be adventurous.' },
  { role: 'user', content: 'Tell me about your ship' },
]);
```

### Example 12: Code Generation

```bash
tsx examples/12-code-generation.ts
```

Generate code with specific requirements and style.

```typescript
const response = await client.chat([
  { role: 'system', content: 'You are an expert programmer. Write clean, well-commented code.' },
  { role: 'user', content: 'Write a TypeScript function that calculates fibonacci numbers' },
]);
```

### Example 13: Translation

```bash
tsx examples/13-translation.ts
```

Use the model for translation tasks.

```typescript
const response = await client.chat([
  { role: 'system', content: 'You are a professional translator.' },
  { role: 'user', content: 'Translate "Hello, how are you?" to Spanish, French, and German' },
]);
```

### Example 14: Few-Shot Learning

```bash
tsx examples/14-few-shot-learning.ts
```

Demonstrate learning from examples in the prompt.

```typescript
const response = await client.chat([
  {
    role: 'system',
    content: 'You are a helpful assistant that learns from examples.',
  },
  {
    role: 'user',
    content:
      'Example 1: "happy" -> positive\nExample 2: "sad" -> negative\nNow classify: "excited"',
  },
]);
```

### Example 15: Summarization

```bash
tsx examples/15-summarization.ts
```

Summarize long text into concise summaries.

```typescript
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
```

### Example 16: Question Answering from Context

```bash
tsx examples/16-qa-from-context.ts
```

RAG-like pattern - answer questions using provided context.

```typescript
const response = await client.chat([
  {
    role: 'system',
    content: 'Answer questions based only on the provided context.',
  },
  {
    role: 'user',
    content: `Context: ${context}\n\nQuestion: When was the Eiffel Tower built?`,
  },
]);
```

### Example 17: Text Classification

```bash
tsx examples/17-text-classification.ts
```

Classify text into categories like sentiment analysis.

```typescript
const response = await client.chat([
  {
    role: 'system',
    content: 'Classify text sentiment as: positive, negative, or neutral.',
  },
  {
    role: 'user',
    content: 'Classify: "I love this product! It works perfectly."',
  },
]);
```

### Example 18: Chain of Thought Reasoning

```bash
tsx examples/18-chain-of-thought.ts
```

Prompt for step-by-step reasoning to solve problems.

```typescript
const response = await client.chat([
  {
    role: 'system',
    content: 'Think step by step and show your reasoning.',
  },
  {
    role: 'user',
    content: 'If a train travels 60 mph for 2 hours, how far does it go?',
  },
]);
```

### Example 19: Prompt Templates

```bash
tsx examples/19-prompt-templates.ts
```

Show reusable prompt patterns and template functions.

```typescript
function createReviewPrompt(product: string, review: string): string {
  return `Review this ${product} review: "${review}"\n\nExtract: rating, sentiment, key points`;
}

const response = await client.complete(createReviewPrompt('laptop', review));
```

### Example 20: Retry Logic

```bash
tsx examples/20-retry-logic.ts
```

Implement retry logic for failed requests with exponential backoff.

```typescript
async function completeWithRetry(prompt: string, maxRetries = 3): Promise<string> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await client.complete(prompt);
    } catch (error) {
      if (attempt === maxRetries) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
}
```

### Example 21: Context Management

```bash
tsx examples/21-context-management.ts
```

Manage long conversations by truncating old messages to stay within context limits.

```typescript
function truncateConversation(messages: Message[], maxMessages: number): Message[] {
  const systemMessage = messages.find((m) => m.role === 'system');
  const otherMessages = messages.filter((m) => m.role !== 'system');
  const recentMessages = otherMessages.slice(-maxMessages);
  return systemMessage ? [systemMessage, ...recentMessages] : recentMessages;
}
```

### Example 22: Response Validation

```bash
tsx examples/22-response-validation.ts
```

Validate LLM outputs before using them (email format, JSON, length, etc.).

```typescript
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const response = await client.complete('Generate an email address');
if (validateEmail(response.trim())) {
  console.log('Valid email:', response);
} else {
  console.error('Invalid email format');
}
```

### Example 23: Prompt Chaining

```bash
tsx examples/23-prompt-chaining.ts
```

Use one LLM response as input to another for multi-step workflows.

```typescript
// Step 1: Generate ideas
const ideas = await client.complete('Generate 3 product ideas');
// Step 2: Evaluate ideas
const evaluation = await client.chat([
  { role: 'system', content: 'Evaluate product ideas' },
  { role: 'user', content: `Evaluate these ideas:\n${ideas}` },
]);
```

### Example 24: Conditional Logic

```bash
tsx examples/24-conditional-logic.ts
```

Use LLM responses to make decisions and route to different handlers.

```typescript
const intent = await client.complete(
  `Classify intent: "${userQuery}"\nOptions: weather, search, chat`
);
if (intent.toLowerCase().includes('weather')) {
  // Handle weather query
} else if (intent.toLowerCase().includes('search')) {
  // Handle search query
}
```

## API Reference

### `OpenRouterClient`

```typescript
new OpenRouterClient(config: {
  apiKey: string;
  baseURL?: string; // Optional, defaults to 'https://openrouter.ai/api/v1'
  defaultModel?: string; // Optional, defaults to 'openai/gpt-3.5-turbo'
})
```

### `complete(prompt, model?)`

Simple completion with a single prompt.

```typescript
const response = await client.complete('Your prompt here', 'optional-model');
// Returns: string
```

### `chat(messages, model?)`

Chat completion with multiple messages.

```typescript
const response = await client.chat(
  [
    { role: 'system' | 'user' | 'assistant', content: 'message content' },
    // ... more messages
  ],
  'optional-model'
);
// Returns: string
```

## Setup

```bash
pnpm install
```

## Environment Variables

```bash
export OPENROUTER_API_KEY='your-api-key-here'
```

## Scripts

- `pnpm test` - Run tests
- `pnpm build` - Type check (no emit)
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

## Checks

- `./check.sh` - Runs formatting, lint, build check, gitleaks, and tests
- `./health.sh` - Checks for outdated dependencies and vulnerabilities
- `./all-checks.sh` - Runs both check.sh and health.sh

## Author

Damir Manapov

## License

MIT
