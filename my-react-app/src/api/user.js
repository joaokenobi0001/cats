const API_URL = 'http://localhost:3000/api/v1/user/';

export async function tokenValidate(token) {
  return {
    url: API_URL + 'validate',
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
    url: API_URL + 'token',
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
    url: API_URL + 'login',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  }
}

export const get_users = (token) => {
  return {
    url: API_URL,
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  }
}

export const bloq_users = (token) => {
  return {
    url: `${API_URL}/${id}/block`,
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  }
}

export const desbloq_users = (token) => {
  return {
    url: `${API_URL}/${id}/unblock`,
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  }
}

export const add_admin = (token) => {
  return {
    url: API_URL + 'admin',
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  }
}

export const add_view = (token) => {
  return {
    url: API_URL,
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  }
}

export const edit_users = (token, id) => {
  return {
    url: `${API_URL}${id}`,
    options: {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  }
}

export const delete_users = (token, id) => {
  return {
    url: `${API_URL}/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  }
}

export const recuperar_senha = (body) => {
  return {
    url: `${API_URL}recuperar`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    },
  }
}

export const verificar_senha = (body) => {
  return {
    url: `${API_URL}verificar`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    },
  }
}

export const atualizar_senha = (body) => {
  return {
    url: `${API_URL}atualizarsenha`,
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    },
  }
}