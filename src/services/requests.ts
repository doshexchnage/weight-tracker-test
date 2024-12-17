// Middleware URL
const middlewareURL: string =  'http://127.0.0.1:7001';

// Helper function
const getJWT = (): string => {
  const jwt = window.localStorage.getItem('jwt');
  return jwt || '';
};

// Helper function to handle Fetch requests
const fetchWithAuth = async (endpoint: string,options: RequestInit = {}): Promise<any> => {
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
  PasswordLogin: async (email: string,password:{}): Promise<any> => {
    return fetchWithAuth(`/auth/login/password/${email}`, {
      method: 'POST',
      body: JSON.stringify(password),
    });
  },
};

// Weight API methods
const Weight = {
  createWeight: async (data: Record<string, any>): Promise<any> => {
    return fetchWithAuth(`/weights`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  getWeights: async (): Promise<any> => {
    return fetchWithAuth('/weights', {
      method: 'GET',
    });
  },
  updateWeightById: async ( data: Record<string, any>): Promise<any> => {
    return fetchWithAuth(`/weights`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  deleteWeightById: async (id: string): Promise<any> => {
    return fetchWithAuth(`/weights/${id}`, {
      method: 'DELETE',
    });
  },
};

export { Auth, Weight };
