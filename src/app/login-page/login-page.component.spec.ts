import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { LoginPageComponent } from './login-page.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';


describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let apiService: ApiService;
  let toastrService: ToastrService;
  let datePipe: DatePipe;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ToastrModule.forRoot(),FormsModule],
      providers: [DatePipe],
      declarations: [ LoginPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    datePipe = TestBed.inject(DatePipe);
    fixture.detectChanges();
  });

  beforeEach(() => {

    toastrService = jasmine.createSpyObj('ToastrService', ['success']);
    datePipe = new DatePipe('en-US');
    router = jasmine.createSpyObj('Router', ['navigate']);
    component = new LoginPageComponent(apiService, router, toastrService, datePipe);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set emailRequired to true when email is null or empty', () => {
    component.email = " ";
    component.onEmailChange();
    expect(component.emailRequired).toBeTrue();

    component.email = '';
    component.onEmailChange();
    expect(component.emailRequired).toBeTrue();
  });

  it('should set passwordRequired to true when password is null or empty', () => {
    component.password = " ";
    component.onPasswordChange();
    expect(component.passwordRequired).toBeTrue();

    component.password = '';
    component.onPasswordChange();
    expect(component.passwordRequired).toBeTrue();
  });

  it('should set emailInvalidFormat to true when email is in an invalid format', () => {
    component.email = 'invalidemail';
    component.onEmailChange();
    expect(component.emailInvalidFormat).toBeTrue();
  });

  it('should set passwordMinLength to true when password length is less than 8', () => {
    component.password = 'abc123';
    component.onPasswordChange();
    expect(component.passwordMinLength).toBeTrue();
  });

  it('should set passwordInvalid to true when password is null', () => {
    component.password = '';
    component.onPasswordChange();
    expect(component.passwordInvalid).toBeTrue();
  });
  
  it('should log in the user and store login time when credentials are correct', () => {
    const loginResponse = {
      status: 'success',
      name: 'John Doe',
      token: 'someToken',
      userid: 'someId',
      time: '2023-05-09T12:34:56Z'
    };
    const userLoginSpy = spyOn(apiService, 'userLogin').and.returnValue(of({ status: 'success' }));
    const toastrSuccessSpy = toastrService.success;
    const routerNavigateSpy = router.navigate;
   
    component.email = 'test@example.com';
    component.password = 'password123';
    component.login();
    expect(userLoginSpy).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
    expect(toastrSuccessSpy).toHaveBeenCalledWith('Login is successfull', 'success', { progressBar: true, progressAnimation: 'increasing' });
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/home']);
    
  });







  
});
