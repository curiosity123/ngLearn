import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './auth.service';
import { User } from 'src/models/User';
import { environment } from 'src/environments/environment';
import { timer } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SPA';

  auth: AuthService;
  user: User;
  username = "unknown";

  constructor(auth: AuthService) {

    this.auth = auth;


  }
  ngOnInit(): void {

      this.user = JSON.parse(localStorage.getItem('user'));
      if (this.user != null && this.user.userName!=null) {
        this.username = this.user.userName;
      }

  }




  login() {

    var rslt = this.auth.loggedIn();
 
    return rslt;
  }
}
