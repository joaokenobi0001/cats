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
    url: API_URL + 'bloq',
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  }
}

export const add_users = (token) => {
  return {
    url: API_URL + 'add',
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  }
}

export const up_users = (token) => {
  return {
    url: API_URL + 'up',
    options: {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  }
}

export const delete_users = (token) => {
  return {
    url: API_URL + 'delete',
    options: {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  }
}

