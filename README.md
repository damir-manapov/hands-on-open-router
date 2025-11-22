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
