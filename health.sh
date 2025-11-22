#!/usr/bin/env bash
set -euo pipefail

echo "Checking for outdated dependencies..."
outdated_packages=$(pnpm outdated 2>&1 | grep -E "^[a-zA-Z@]" || true)
if [ -n "$outdated_packages" ]; then
  echo "Error: Outdated dependencies found"
  pnpm outdated
  exit 1
fi

echo "Checking for vulnerabilities..."
audit_output=$(pnpm audit --audit-level=moderate 2>&1 || true)
if echo "$audit_output" | grep -qE "^[0-9]+ vulnerabilities found"; then
  echo "Error: Vulnerabilities found"
  echo "$audit_output"
  exit 1
fi

echo "All dependencies are up-to-date and secure!"

