const API_URL = 'http://localhost:3000/api/v1/user';

export async function tokenValidate(token) {
  return {
    url: API_URL + '/validate',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  }
}

export async function userGet(token) {
  return {
    url: API_URL + '/token',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  }
}

export async function loginUser(body) {
  return {
    url: API_URL + '/login',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  }
}


/*
export async function registerUser(body) {
  try {
    return {
      url: API_URL + '/admin',
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    }
  } catch (error) {
    console.error('Erro ao cadastrar:', error.response ? error.response.data : error);
    throw new Error('Erro ao cadastrar. Tente novamente.');
  }
}


export async function bloquearUser(id, requestingUser) {
  try {
    const response = await axios.post(API_URL + `/${id}/block`, {
      requestingUser,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao bloquear usuário:', error.response ? error.response.data : error);
    throw new Error('Erro ao bloquear usuário. Tente novamente.');
  }
}

export async function desbloquearUser(id, requestingUser) {
  try {
    const response = await axios.post(API_URL + `/${id}/unblock`, {
      requestingUser,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao desbloquear usuário:', error.response ? error.response.data : error);
    throw new Error('Erro ao desbloquear usuário. Tente novamente.');
  }
}
*/