import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  name:any={}
  
constructor(private api:ApiService){

  let userId=localStorage.getItem("id");


  let name = localStorage.getItem("name");
  this.name=name;
  

  

}


}
