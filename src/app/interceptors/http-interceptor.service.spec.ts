import { TestBed } from '@angular/core/testing';

import { HttpInterceptorService } from './http-interceptor.service';
import { AuthService } from '../auth/auth.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

describe('HttpInterceptorService', () => {
  let service: HttpInterceptorService;
  let interceptor: HttpInterceptorService;
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        HttpTestingController,
        HttpClient,
        HttpHandler,
        HttpInterceptorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterceptorService,
          multi: true
        }
      ]
    });
    service = TestBed.inject(HttpInterceptorService);
    interceptor = TestBed.inject(HttpInterceptorService);
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

 

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an Authorization header with a Bearer token to the request', () => {
    const token = 'test_token';
    spyOn(authService, 'getToken').and.returnValue(token);
    const req = new HttpRequest('GET', 'http://example.com');

    interceptor.intercept(req, {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        expect(req.headers.get('Authorization')).toBe(`Bearer ${token}`);
        return new Observable<HttpEvent<any>>();
      }
    });
  });

});
