#!/bin/bash

# Function to load environment variables from .env file
load_env() {
  if [[ -f .env ]]; then
    export $(grep -E '^[A-Z_]+=' .env | xargs)
  else
    echo "Error: .env file not found."
    exit 1
  fi
}

# Load environment variables
load_env

# Run the npx supabase gen types command with the PROJECT_REF value
npx supabase gen types typescript --project-id "$PROJECT_REF" --schema public > src/lib/database.types.ts
