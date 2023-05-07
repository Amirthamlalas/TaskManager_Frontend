import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './auth/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { DatePipe } from '@angular/common';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';

const myroute :Routes=[
  {
    path:"",
    component:LoginPageComponent,
  },
 
  {
    path:"home",
    component:HomePageComponent,canActivate:[AuthGuard]
  }

]
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    NavbarComponent,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(myroute),
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      closeButton: true,
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
      toastClass: 'custom-toast'
      
    }),
    BrowserAnimationsModule,
    DatePipe
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },DatePipe,
    ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
