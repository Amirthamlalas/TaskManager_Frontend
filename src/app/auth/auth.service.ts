import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor() { }

  clearToken(): void {
    localStorage.removeItem('token');
  } 
  isAuthenticated(){
    return localStorage.getItem("token")!=null;
  }
  getToken(): string | null {
    return localStorage.getItem("token");
  }
}
