const API_URL = 'http://localhost:3001/api/v1/user/';

// Função para validar token
export async function tokenValidate(token) {
  return {
    url: API_URL + 'validate',  // Rota correta
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

// Função para obter informações do usuário
export async function userGet(token) {
  return {
    url: API_URL + 'token',  // Rota correta
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

// Função de login do usuário
export async function loginUser(body) {
  return {
    url: API_URL + 'login',  // Rota correta
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

// Função para obter todos os usuários
export const get_users = (token) => {
  return {
    url: API_URL,  // Rota correta
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  };
};

// Função para bloquear um usuário
export const bloq_users = (token, id) => {
  return {
    url: `${API_URL}${id}/block`,  // Rota correta
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  };
};

// Função para desbloquear um usuário
export const desbloq_users = (token, id) => {
  return {
    url: `${API_URL}${id}/unblock`,  // Rota correta
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  };
};

// Função para adicionar um usuário administrador
export const add_admin = (token, userData) => {
  return {
    url: `${API_URL}admin`,  // Rota correta para admin
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    },
  };
};

// Função para adicionar um usuário visualizador
export const add_view = (token, userData) => {
  return {
    url: `${API_URL}`,  // Rota correta
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    },
  };
};

// Função para editar um usuário
export const edit_users = (token, id, userData) => {
  return {
    url: `${API_URL}${id}`,  // Rota correta para editar
    options: {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    },
  };
};

// Função para deletar um usuário
export const delete_users = (token, id) => {
  return {
    url: `${API_URL}${id}`,  // Rota correta de exclusão
    options: {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  };
};

// Função para enviar código de recuperação
export const recuperar_senha = (body) => {
  return {
    url: `${API_URL}recuperar`,  // Rota correta
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
};

// Função para verificar código de recuperação
export const verificar_senha = ({ email, codigoAcesso }) => {
  return {
    url: `${API_URL}verificar`,  // Rota correta
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, codigoAcesso }),
    },
  };
};

// Função para atualizar senha
export const atualizar_senha = (body) => {
  return {
    url: `${API_URL}atualizarsenha`,  // Rota correta
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
};

// Função para verificar código de recuperação
export const verifyRecoveryCode = ({ email, codigoAcesso }) => {
  return {
    url: `${API_URL}verifica_codigo`,  // Rota correta
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, codigoAcesso }),
    },
  };
};

// Função para registrar usuário
export const registerUser = (userData) => {
  return {
    url: `${API_URL}`,  // Rota correta de cadastro
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    },
  };
};
