import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  static getData() {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }

  userLogin=(DatatoSend:any) : Observable<any>=>{
    return this.http.post("http://localhost:8080/login",DatatoSend)
  }



  userLogout=(DatatoSend:any): Observable<any>=>{
    return this.http.post("http://localhost:8080/logout",DatatoSend)

  }


}
