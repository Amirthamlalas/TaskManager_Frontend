import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logint:any={}
  logOut:any={}
  id:any=""
  
  constructor(private datePipe:DatePipe,private api:ApiService,private route:Router){
   let logintime =localStorage.getItem("loginTime");
   console.log(logintime)
   this.logint=logintime;

   let userId=localStorage.getItem("id");
   this.id=userId;

   let time=localStorage.getItem("time");
   let formattedTime:any= this.datePipe.transform(time, 'shortTime');
  
   console.log(formattedTime)
    this.logOut=formattedTime.toString();
 
  
 }
  logout=()=>{
   
    let data:any={"id":this.id}
   console.log(data)
 this.api.userLogout(data).subscribe(
  (response:any)=>{
    if(response.status=="success"){
      console.log(response)
      this.logOut=response.time
      
      localStorage.setItem('time',response.time);
      this.route.navigate(['']);
    }
  }

 )
  

   
  }
}
