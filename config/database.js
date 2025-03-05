const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');

  const connections = {
    postgres: {
      connection: {
        host: env('DATABASE_HOST', 'dpg-cv0c74pu0jms73fc4860-a'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi_landing_pages_vgve'),
        user: env('DATABASE_USERNAME', 'strapi_landing_pages_vgve_user'),
        password: env('DATABASE_PASSWORD', 'HIcYeR0SCzW1PTexDSRjWWOMpl4Oe4xN'),
        ssl: {
          rejectUnauthorized: false, // Altere para true se necessário
        },
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};