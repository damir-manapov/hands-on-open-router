#!/usr/bin/env bash
set -euo pipefail

echo "Running formatting..."
pnpm format

echo "Running lint check..."
pnpm lint

echo "Running build check (no emit)..."
pnpm build

echo "Running gitleaks check..."
if command -v gitleaks >/dev/null 2>&1; then
  gitleaks detect --source . --verbose
else
  echo "Warning: gitleaks not found, skipping gitleaks check"
fi

echo "Running tests..."
pnpm test

echo "All checks passed!"

