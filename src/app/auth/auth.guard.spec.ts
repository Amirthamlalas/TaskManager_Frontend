import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { ApiService } from '../api.service';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService:AuthService;
  let router:any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[{
        provide: AuthService,
        useValue: { isAuthenticated: () => {} },
      },
      {
        provide: Router,
        useValue: { navigate: () => {} },
      },]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user is authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;
    const canActivateResult: boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> =
      guard.canActivate(route, state);
    expect(canActivateResult).toEqual(true);
  });


  it('should return false and navigate to login page if user is not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    spyOn(router, 'navigate');
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;
    const canActivateResult: boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> =
      guard.canActivate(route, state);
    expect(canActivateResult).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
