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

export const bloq_users = (token, id) => {
  return {
    url: `${API_URL}${id}/block`, 
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  };
};

export const desbloq_users = (token, id) => {
  return {
    url: `${API_URL}${id}/unblock`, 
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  };
};


export const add_admin = (token, userData) => {
  return {
    url: `${API_URL}admin`,  // A URL para o admin
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),  // Passando os dados do usuário (como nome, email, etc.)
    },
  };
};

export const add_view = (token, userData) => {
  return {
    url: `${API_URL}`,  // A URL para o view
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),  // Passando os dados do usuário (como nome, email, etc.)
    },
  };
};




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
    url: `${API_URL}${id}`,
    options: {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  }
}

export const enviar_code = (email) => {
  return {
    url: `${API_URL}recuperar`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email)
    },
  }
}

export const verificar_code = ({ email, codigoAcesso }) => {
  return {
    url: `${API_URL}verificar`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, codigoAcesso })
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
