#!/usr/bin/env bash

# Move the Platform.sh-specific configuration.
rm config/database.json && mv platformsh/database.js config/environments/development/database.js
rm config/server.json && mv platformsh/server.json config/environments/development/server.json

# Rebuild the admin panel.
yarn build
./node_modules/.bin/strapi configuration:restore -f configuration-dump.json

# Make start command executable.
chmod +x start.sh