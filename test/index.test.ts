import { describe, it, expect, beforeEach, vi } from 'vitest';
import { OpenRouterClient } from '../src/index.js';

const mockStore = {
  create: vi.fn(),
};

vi.mock('openai', () => {
  class MockOpenAI {
    chat = {
      completions: {
        create: mockStore.create,
      },
    };
  }

  return {
    default: MockOpenAI,
  };
});

describe('OpenRouterClient', () => {
  let client: OpenRouterClient;

  beforeEach(() => {
    vi.clearAllMocks();
    mockStore.create.mockClear();
    client = new OpenRouterClient({
      apiKey: 'test-api-key',
      defaultModel: 'openai/gpt-3.5-turbo',
    });
  });

  describe('constructor', () => {
    it('should initialize client', () => {
      expect(client).toBeInstanceOf(OpenRouterClient);
    });

    it('should use custom default model when provided', async () => {
      const customClient = new OpenRouterClient({
        apiKey: 'test-api-key',
        defaultModel: 'anthropic/claude-3-opus',
      });

      mockStore.create.mockResolvedValue({
        choices: [
          {
            message: {
              content: 'Response',
            },
          },
        ],
      });

      await customClient.complete('Test');

      expect(mockStore.create).toHaveBeenCalledWith({
        model: 'anthropic/claude-3-opus',
        messages: [{ role: 'user', content: 'Test' }],
      });
    });
  });

  describe('chat', () => {
    it('should call API and return content', async () => {
      const expectedContent = 'Test response';
      mockStore.create.mockResolvedValue({
        choices: [
          {
            message: {
              content: expectedContent,
            },
          },
        ],
      });

      const messages = [
        { role: 'user' as const, content: 'Hello' },
        { role: 'assistant' as const, content: 'Hi there' },
      ];

      const result = await client.chat(messages);

      expect(result).toBe(expectedContent);
      expect(mockStore.create).toHaveBeenCalledWith({
        model: 'openai/gpt-3.5-turbo',
        messages,
      });
    });

    it('should use custom model when provided', async () => {
      mockStore.create.mockResolvedValue({
        choices: [
          {
            message: {
              content: 'Response',
            },
          },
        ],
      });

      await client.chat([{ role: 'user' as const, content: 'Hello' }], 'anthropic/claude-3-opus');

      expect(mockStore.create).toHaveBeenCalledWith({
        model: 'anthropic/claude-3-opus',
        messages: [{ role: 'user', content: 'Hello' }],
      });
    });

    it('should throw error when response has no content', async () => {
      mockStore.create.mockResolvedValue({
        choices: [
          {
            message: {},
          },
        ],
      });

      await expect(client.chat([{ role: 'user' as const, content: 'Test' }])).rejects.toThrow(
        'No content in response'
      );
    });

    it('should throw error when response has no choices', async () => {
      mockStore.create.mockResolvedValue({
        choices: [],
      });

      await expect(client.chat([{ role: 'user' as const, content: 'Test' }])).rejects.toThrow(
        'No content in response'
      );
    });
  });

  describe('complete', () => {
    it('should call API and return content', async () => {
      const expectedContent = 'Completion response';
      mockStore.create.mockResolvedValue({
        choices: [
          {
            message: {
              content: expectedContent,
            },
          },
        ],
      });

      const result = await client.complete('Hello, world!');

      expect(result).toBe(expectedContent);
      expect(mockStore.create).toHaveBeenCalledWith({
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Hello, world!' }],
      });
    });

    it('should use custom model when provided', async () => {
      mockStore.create.mockResolvedValue({
        choices: [
          {
            message: {
              content: 'Response',
            },
          },
        ],
      });

      await client.complete('Hello', 'anthropic/claude-3-opus');

      expect(mockStore.create).toHaveBeenCalledWith({
        model: 'anthropic/claude-3-opus',
        messages: [{ role: 'user', content: 'Hello' }],
      });
    });
  });
});
