const path = require('path');

module.exports = {
  upload: {
    config: {
      provider: path.resolve(__dirname, '../extensions/upload/providers/imgur'), // Caminho absoluto para o provedor personalizado
      providerOptions: {
        clientId: process.env.IMGUR_CLIENT_ID,
        clientSecret: process.env.IMGUR_CLIENT_SECRET,
      },
    },
  },
};