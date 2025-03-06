const axios = require('axios');
const FormData = require('form-data');

module.exports = {
  init: (providerOptions) => {
    return {
      upload: async (file) => {
        const formData = new FormData();
        formData.append('image', file.buffer, { filename: file.name });

        try {
          // Primeiro, obtenha o access_token usando o Client ID e Client Secret
          const authResponse = await axios.post('https://api.imgur.com/oauth2/token', null, {
            params: {
              client_id: providerOptions.clientId,
              client_secret: providerOptions.clientSecret,
              grant_type: 'client_credentials',
            },
          });

          const accessToken = authResponse.data.access_token;

          // Agora, faça o upload da imagem usando o access_token
          const uploadResponse = await axios.post('https://api.imgur.com/3/image', formData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              ...formData.getHeaders(),
            },
          });

          // Log da resposta da API do Imgur para depuração
          console.log('Resposta da API do Imgur:', uploadResponse.data);

          // Usa a URL direta da imagem retornada pela API
          file.url = uploadResponse.data.data.link; // URL direta da imagem
          file.mime = uploadResponse.data.data.type;
          return file;
        } catch (error) {
          console.error('Erro ao fazer upload para Imgur:', error);
          throw new Error('Upload failed');
        }
      },

      delete: async (file) => {
        console.warn('A exclusão de arquivos não é suportada pelo Imgur.');
        return file;
      },
    };
  },
};