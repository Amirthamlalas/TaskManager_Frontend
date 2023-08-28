import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if token exists in local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false if token does not exist in local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should remove token from localStorage', () => {
    spyOn(localStorage, 'removeItem');
    service.clearToken();
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });

  it('should return null when token is not present in local storage', () => {
    localStorage.removeItem('token');
    expect(service.getToken()).toBeNull();
  });

  it('should return token value when token is present in local storage', () => {
    const token = '1234567890';
    localStorage.setItem('token', token);
    expect(service.getToken()).toEqual(token);
    localStorage.removeItem('token');
  });
});
