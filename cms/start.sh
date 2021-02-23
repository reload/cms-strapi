#!/usr/bin/env bash

# Environment-specific configuration for Strapi.
if [ "$PLATFORM_BRANCH" = main ]; then
   yarn start
else
   yarn develop
fi