module.exports = ({ env }) => ({
  // Basic server settings.
  // See https://strapi.io/documentation/v3.x/getting-started/deployment.html#application-configuration
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),

  // Admin user JWT configuration.
  // See https://strapi.io/documentation/v3.x/plugins/users-permissions.html#jwt-configuration
  admin: {
    auth: {
      secret: env(
        "PLATFORM_PROJECT_ENTROPY",
        "7efd7eca0b870d22e2baef00570a0b41"
      ),
    },
  },
});
