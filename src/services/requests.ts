// Middleware URL configuration
const middlewareURL: string =
  process.env.REACT_APP_MIDDLEWARE_URL || 'http://127.0.0.1:7001';

// Helper function to retrieve JWT from localStorage
const getJWT = (): string => {
  const jwt = window.localStorage.getItem('jwt');
  return jwt || '';
};

// Helper function to handle Fetch requests
const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${getJWT()}`,
    ...options.headers,
  };

  const response = await fetch(`${middlewareURL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Request failed');
  }

  return response.json(); // Parse and return JSON response
};

// Auth API methods
const Auth = {
  PasswordLogin: async (
    email: string,
    password: { password: string }
  ): Promise<any> => {
    return fetchWithAuth(`/auth/login/password/${email}`, {
      method: 'PATCH',
      body: JSON.stringify(password),
    });
  },
};

// User API methods
const User = {
  createUser: async (data: Record<string, any>): Promise<any> => {
    return fetchWithAuth(`/user`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  getUserById: async (id: string): Promise<any> => {
    return fetchWithAuth(`/user/id/${id}`, {
      method: 'GET',
    });
  },
  getUsers: async (): Promise<any> => {
    return fetchWithAuth('/user', {
      method: 'GET',
    });
  },
  updateUserById: async (
    id: string,
    data: Record<string, any>
  ): Promise<any> => {
    return fetchWithAuth(`/user/id/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
  updatePassword: async (
    email: string,
    password: { newPassword: string }
  ): Promise<any> => {
    return fetchWithAuth(`/updatepassword/password/${email}`, {
      method: 'PATCH',
      body: JSON.stringify(password),
    });
  },
};

export { Auth, User };
