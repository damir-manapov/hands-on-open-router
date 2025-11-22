# Hands-on Open Router

Working with LLM through Open Router

## Author

Damir Manapov

## License

MIT

## Stack

- TypeScript
- pnpm
- Vitest
- tsx
- ESLint
- Prettier
- gitleaks

## Setup

```bash
pnpm install
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
