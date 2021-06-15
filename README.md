# Overview

- `/cctl` consist of a ingest script for strapi
- `/client` is a simple React SPA
- `/cms` Strapi CMS

# Platform.sh

[Link to platform](https://console.platform.sh/reload/uh4apdzsvuly4)

# Development setup

![Overview of our solution](/docs/overview.png?raw=true)

# SSH into master

`ssh uh4apdzsvuly4-main-bvxea6i--cms@ssh.eu-5.platform.sh`

# Production

Client - react:
https://www.main-bvxea6i-uh4apdzsvuly4.eu-5.platformsh.site/admin

CMS - strapi:
https://www.api.main-bvxea6i-uh4apdzsvuly4.eu-5.platformsh.site/admin

![Login information](/docs/login.png?raw=true)

## Generate token to client

Send POST request to `/auth/local` with login payload, or create a new user under the `User` content type

```
{
  "identifier": "consumerapi@consumerapi.com",
  "password": "Consumerapi1"
}
```
