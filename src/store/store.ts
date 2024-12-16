import { makeObservable, observable, action } from "mobx";
import { Auth, Weight } from "../services/requests";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthResponse {
  user: User;
  jwt: string;
}

class Store {
  user: User | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeObservable(this, {
      user: observable,
      isLoading: observable,
      error: observable,
      setUser: action,
      setLoading: action,
      setError: action,
      login: action,
      logout: action,

    });
  }

  setUser(user: User | null) {
    this.user = user;
  };
  setLoading(value: boolean) {
    this.isLoading = value;
  };
  setError(message: string | null) {
    this.error = message;
  };

  //login
  async login(email: string, password: {}) {
    if (!email || !password) {
      this.setError("Email and password are required.");
      return false;
    }
    this.setLoading(true);
    this.setError(null);

    try {
      const response = await Auth.PasswordLogin(email.trim(), password);
      console.log(response)
      if (response && response.user && response.jwt) {

        const { user, jwt }: AuthResponse = response;
        window.localStorage.setItem('jwt', jwt);
        this.setUser(user);
        return true;
      }
      this.setError("Invalid response from server.");
      return false;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        this.setError("Invalid email or password.");
      } else if (error.response && error.response.status >= 500) {
        this.setError("Server error. Please try again later.");
      } else {
        this.setError("Login failed. Please check your network connection.");
      }
      return false;
    } finally {
      this.setLoading(false);
    };
  };

  //create weight
  async createWeight(data: {}) {
    this.setLoading(true);
    this.setError(null);

    try {
      const response = await Weight.createWeight(data);
      if (response.weight !== 'error') {
        return response.weight
      };
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        this.setError("Invalid email or password.");
      } else if (error.response && error.response.status >= 500) {
        this.setError("Server error. Please try again later.");
      } else {
        this.setError("Login failed. Please check your network connection.");
      };
      return false;
    } finally {
      this.setLoading(false);
    };
  };

  //get all weights
  async getWeights() {
    this.setLoading(true);
    this.setError(null);

    try {
      const response = await Weight.getWeights();
      console.log(response)
      if (response.weights !== 'error') {
        return response.weights
      };
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        this.setError("Invalid email or password.");
      } else if (error.response && error.response.status >= 500) {
        this.setError("Server error. Please try again later.");
      } else {
        this.setError("Login failed. Please check your network connection.");
      };
      return false;
    } finally {
      this.setLoading(false);
    };
  };

  //update weight
  async updateWeight(data: {}) {
    this.setLoading(true);
    this.setError(null);

    try {
      const response = await Weight.updateWeightById(data);
      console.log(response)
      if (response.weight !== 'error') {
        return response.weight
      };
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        this.setError("Invalid email or password.");
      } else if (error.response && error.response.status >= 500) {
        this.setError("Server error. Please try again later.");
      } else {
        this.setError("Login failed. Please check your network connection.");
      };
      return false;
    } finally {
      this.setLoading(false);
    };
  };

  //delete weight
  async deleteWeight(ID: string) {
    this.setLoading(true);
    this.setError(null);

    try {
      const response = await Weight.deleteWeightById(ID);
      console.log(response)
      if (response.weight !== 'error') {
        return response.weight
      };
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        this.setError("Invalid email or password.");
      } else if (error.response && error.response.status >= 500) {
        this.setError("Server error. Please try again later.");
      } else {
        this.setError("Login failed. Please check your network connection.");
      };
      return false;
    } finally {
      this.setLoading(false);
    };
  };

  logout() {
    this.setUser(null);
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}
const store = new Store();
export default store;
