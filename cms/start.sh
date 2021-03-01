#!/usr/bin/env bash

# Environment-specific configuration for Strapi.
if [ "$PLATFORM_BRANCH" = main ]; then
   echo "Starting in prod mode"
   yarn start
else
   echo "Starting in dev mode"
   yarn develop
fi