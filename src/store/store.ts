import { observable, action, makeObservable } from "mobx
import { Auth,User } from "../services/requests";

class AuthStore {
  @observable isLoggedIn: boolean = false;
  @observable user: any = null; // Define a more specific type based on your user structure
  @observable isLoading: boolean = false;
  @observable error: string | null = null;

  constructor() {
    makeObservable(this);
  }

  @action setLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }

  @action setUser (user: any) {
    this.user = user;
  }

  @action setLoading(value: boolean) {
    this.isLoading = value;
  }

  @action setError(message: string | null) {
    this.error = message;
  }

  @action async login(email: string, password: string): Promise<boolean> {
    this.setLoading(true);
    this.setError(null); // Reset error before login attempt

    try {
      const response = await Auth.PasswordLogin(email, { password });
      this.setUser (response.data.response.user);
      this.setLoggedIn(true);
      window.localStorage.setItem('jwt', response.data.response.jwt); // Store JWT
      return true;
    } catch (error) {
      return false;
    } finally {
      this.setLoading(false);
    }
  }

  @action logout() {
    this.setUser (null);
    this.setLoggedIn(false);
    window.localStorage.removeItem('jwt'); // Clear JWT on logout
  }
}

export default AuthStore;