export const api = 'http://localhost:3000/api';
export const uploads = 'http://localhost:3000/uploads';

export const requestConfig = (method, data, token = null, image = null) => {
  let config;

  if (image) {
    config = {
      method,
      body: data,
      headers: {},
    };
  } else if (method === 'DELETE' || data === null) {
    config = {
      method,
      headers: {},
    };
  } else if (method === 'PUT' && typeof data === 'object') {
    // CONDIÇÃO QUE VERIFICA SE OS DADOS ENVIADOS SÃO DO TIPO 'FormData'
    config = {
      method,
      body: data,
      headers: {},
    };
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
