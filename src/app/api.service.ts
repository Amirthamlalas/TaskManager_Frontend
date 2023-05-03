import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  userLogin=(DatatoSend:any)=>{
    return this.http.post("http://localhost:8080/login",DatatoSend)
  }

  userLogout=(DatatoSend:any)=>{
    return this.http.post("http://localhost:8080/logout",DatatoSend)

  }

  logView=()=>{
    return this.http.get("http://localhost:8080/view")
  }

  log=(DatatoSend:any)=>{
    return this.http.post("http://localhost:8080/logo",DatatoSend)

  }
}
