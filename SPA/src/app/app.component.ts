import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './auth.service';
import { User } from 'src/models/User';
import { environment } from 'src/environments/environment';
import { timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


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

  constructor(auth: AuthService, private route: ActivatedRoute,
    private router: Router) {

    this.auth = auth;
    if (!this.auth.loggedIn()) {
      this.router.navigate(['/home-component']);
    }
    else {
      this.router.navigate(['/stats-component']);
    }

  }
  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user != null && this.user.userName != null) {
      this.username = this.user.userName;
    }
  }

help()
{
  this.router.navigate(['/help-component']);
}

settings()
{
  this.router.navigate(['/settings-component']);
}

  login() {
    const rslt = this.auth.loggedIn();
    return rslt;
  }

  stats()
  {
    this.router.navigate(['/stats-component']);
  }
  logout() {

    this.auth.logout();
    this.router.navigate(['/home-component']);
  }

}
