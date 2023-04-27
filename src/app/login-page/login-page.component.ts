import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  email=""
  password=""
  constructor(private api:ApiService,private route:Router,private toastr:ToastrService ){}
  login=()=>{
    let data:any={"email":this.email,"password":this.password}

    this.api.userLogin(data).subscribe(
      (response:any)=>{
        if(response.status=="success"){
          this.toastr.success("Login is successfull", "success", {
            titleClass: "center",
            messageClass: "center"
          })
          
          }
        else{
          alert("Email or Password is incorrect")
        }
      }
    )
    console.log(data)
  }


}
