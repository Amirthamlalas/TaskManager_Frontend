
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
const TOKEN_HEADER_KEY = 'Authorization';  
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authreq=req
    const jwt = this.authService.getToken();
    if (jwt!=null) {
    authreq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + jwt) }); 
   }
   return next.handle(authreq);
 }
}

