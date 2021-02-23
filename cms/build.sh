#!/usr/bin/env bash

# Create quickstart Strapi project.
yarn install
yarn add pg
yarn add platformsh-config

# Move the Platform.sh-specific configuration.
rm config/environments/development/database.json && mv platformsh/database.js config/environments/development/database.js
rm config/environments/development/server.json && mv platformsh/server.json config/environments/development/server.json

# Rebuild the admin panel.
yarn strapi install graphql
yarn build

# Make start command executable.
chmod +x start.sh