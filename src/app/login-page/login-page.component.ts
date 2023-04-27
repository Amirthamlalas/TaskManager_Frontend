import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  email=""
  password=""
constructor(){}
  login=()=>{
    let data:any={"email":this.email,"password":this.password}

   
    console.log(data)
  }

}
