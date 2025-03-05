const axios = require('axios');
const FormData = require('form-data');

module.exports = {
  init: (providerOptions) => {
    return {
      upload: async (file) => {
        const formData = new FormData();
        formData.append('image', file.buffer, { filename: file.name });

        try {
          const response = await axios.post('https://api.imgur.com/3/image', formData, {
            headers: {
              Authorization: `Client-ID ${providerOptions.clientId}`,
              ...formData.getHeaders(),
            },
          });

          // Log da resposta da API do Imgur para depuração
          console.log('Resposta da API do Imgur:', response.data);

          // Usa a URL direta da imagem retornada pela API
          file.url = response.data.data.link; // URL direta da imagem
          file.mime = response.data.data.type;
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