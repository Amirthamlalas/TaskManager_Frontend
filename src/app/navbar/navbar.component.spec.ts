import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { NavbarComponent } from './navbar.component';
import { DatePipe } from '@angular/common';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/internal/observable/of';



describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let apiService : ApiService;
  let router : Router;
  let authService : AuthService;
  


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [HttpClientTestingModule],
      providers: [DatePipe,
        
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['clearToken', 'isAuthenticated', 'getToken']) },
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    
    
   
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize logint when loginTime is in local storage', () => {
    const datePipe = new DatePipe('en-US');
    spyOn(localStorage, 'getItem').and.returnValues('10:30 AM');
    const component = new NavbarComponent(datePipe, apiService, router, authService);
    expect(component.logint).toEqual('10:30 AM');
});


it('should initialize logint as null when loginTime is not in local storage', () => {
  const datePipe = new DatePipe('en-US');
  spyOn(localStorage, 'getItem').and.returnValues(null);
  const component = new NavbarComponent(datePipe, apiService, router, authService);
  expect(component.logint).toBeNull(); 
});

it('should initialize logOut as null when time is not in local storage', () => {
  const datePipe = new DatePipe('en-US');
  spyOn(localStorage, 'getItem').and.returnValues(null, null, null);
  const component = new NavbarComponent(datePipe, apiService, router, authService);
  expect(component.logOut).toBeNull();
});




it('should display TaskManager as the navbar brand', () => {
  const brandLink = fixture.debugElement.query(By.css('.navbar-brand')).nativeElement;
  expect(brandLink.textContent.trim()).toBe('TaskManager');
});

it('should call logout method and navigate to home', () => {
  const userLogoutSpy = spyOn(apiService, 'userLogout').and.returnValue(of({ status: 'success' }));
  const clearTokenSpy = authService.clearToken;
  const navigateSpy = spyOn(router, 'navigate');
  component.logout();
  expect(userLogoutSpy).toHaveBeenCalled();
  expect(clearTokenSpy).toHaveBeenCalled();
  expect(navigateSpy).toHaveBeenCalledWith(['/']);
});



});
