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

```typescript
try {
  const response = await client.complete('Hello!');
  console.log(response);
} catch (error) {
  console.error('Error:', error instanceof Error ? error.message : error);
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
