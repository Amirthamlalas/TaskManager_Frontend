import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private TOKEN_KEY = 'authToken';
  constructor() { }
 getToken(): string | null {
    return localStorage.getItem("token");
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }
  
  isAuthenticated(){
    return localStorage.getItem("token")!=null;
  }
}
