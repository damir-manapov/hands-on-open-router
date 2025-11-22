#!/usr/bin/env bash
set -euo pipefail

echo "Running all checks..."
./check.sh
./health.sh
echo "All checks completed successfully!"

