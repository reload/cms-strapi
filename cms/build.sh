#!/usr/bin/env bash

# Move the Platform.sh-specific configuration.
rm config/database.json && mv platformsh/database.js config/environments/development/database.js
rm config/server.json && mv platformsh/server.json config/environments/development/server.json

# Rebuild the admin panel.
yarn build

# Make start command executable.
chmod +x start.sh