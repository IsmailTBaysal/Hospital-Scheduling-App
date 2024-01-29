const BASE_URL = "http://localhost:8080";

export const login = async (credentials) => {
  const response = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  const data = await response.json();
  return data;
};

export const register = async (credentials) => {
  const response = await fetch(`${BASE_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Failed to register");
  }

  const data = await response.json();
  return data;
};

export const getCurrentUser = async () => {
    const token = localStorage.getItem('jwt_token');
    const response = await fetch(`${BASE_URL}/api/current-user`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch current user');
    }

    const data = await response.json();
    return data;
};