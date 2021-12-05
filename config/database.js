module.exports = ({ env }) => {
  if (env("NODE_ENV") == "production") {
    return {
      defaultConnection: "default",
      connections: {
        default: {
          connector: "mongoose",
          settings: {
            host: env("DATABASE_HOST"),
            srv: env.bool("DATABASE_SRV", true),
            port: env.int("DATABASE_PORT", 27017),
            database: env("DATABASE_NAME"),
            username: env("DATABASE_USERNAME"),
            password: env("DATABASE_PASSWORD"),
          },
          options: {
            authenticationDatabase: env("AUTHENTICATION_DATABASE", null),
            ssl: env.bool("DATABASE_SSL", true),
          },
        },
      },
    };
  } else {
    return {
      defaultConnection: "default",
      connections: {
        default: {
          connector: "mongoose",
          settings: {
            host: env("DATABASE_HOST_DEV"),
            srv: env.bool("DATABASE_SRV", true),
            port: env.int("DATABASE_PORT", 27017),
            database: env("DATABASE_NAME_DEV"),
            username: env("DATABASE_USERNAME_DEV"),
            password: env("DATABASE_PASSWORD_DEV"),
          },
          options: {
            authenticationDatabase: env("AUTHENTICATION_DATABASE", null),
            ssl: env.bool("DATABASE_SSL", true),
          },
        },
      },
    };
  }
};
