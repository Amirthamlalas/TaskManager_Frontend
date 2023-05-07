import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  email=""
  emailInvalid: boolean = false;
  emailRequired: boolean = false;
  emailInvalidFormat: boolean = false;

  onEmailChange() {
    this.emailRequired = this.email == null || this.email.trim() === '';
    this.emailInvalidFormat = !this.emailRequired && !this.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    this.emailInvalid = this.emailRequired || this.emailInvalidFormat;
  } 
 
  password=""
  passwordInvalid: boolean = false;
  passwordRequired: boolean = false;
  passwordMinLength: boolean = false;

  onPasswordChange() {
    this.passwordRequired = this.password == null || this.password.trim() === '';
    this.passwordMinLength = !this.passwordRequired && this.password.length < 8;
    this.passwordInvalid = this.passwordRequired || this.passwordMinLength;
  }
 
  logoutTime:any={}
  
  constructor(private api:ApiService,private route:Router,private toastr:ToastrService,private datePipe: DatePipe){
   
  }
  
 

  

login=()=>{
    let data:any={"email":this.email,"password":this.password}
    let currenttime:any= new Date();
    
    this.api.userLogin(data).subscribe(
      (response:any)=>{
        if(response.status=="success"){
          
          
          localStorage.setItem('name',response.name);
          localStorage.setItem('token',response.token);
          console.log(response.token);
          localStorage.setItem('id',response.userid);
          localStorage.setItem('time',response.time)
          this.toastr.success("Login is successfull", "success",{"progressBar":true,"progressAnimation":'increasing'})
          
          this.route.navigate(['/home']);


          let formattedTime:any= this.datePipe.transform(currenttime, 'shortTime');
          localStorage.setItem('loginTime', formattedTime.toString());
          console.log(formattedTime)

          
          
          
        
         
          }

        else{
          alert("Email or Password is incorrect")
        }
      }
    )
    console.log(data)
  }

 

 
}
