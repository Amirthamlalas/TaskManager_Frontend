import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logint: any = {}
  logOut: any = {}
  id: any = ""
constructor(private datePipe: DatePipe, private api: ApiService, private route: Router, private authService: AuthService) {
    let logintime = localStorage.getItem("loginTime");
    this.logint = logintime;

    let userId = localStorage.getItem("id");
    this.id = userId;

    let time = localStorage.getItem("time");
    let formattedTime: any = this.datePipe.transform(time, 'shortTime');
    this.logOut = formattedTime;
  }
  logout = () => {
    let data: any = { "id": this.id }
    this.api.userLogout(data).subscribe(
      (response: any) => {
        if (response.status == "success") {
          this.authService.clearToken()
          this.route.navigate(['/']);
        }
      })
    }
}
