import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from 'src/models/User';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SPA';
  opened: boolean;


  auth: AuthService;
  user: User;
  username = 'unknown';

  constructor(auth: AuthService, private router: Router) {

    this.auth = auth;
    if (!this.auth.loggedIn()) {
      this.router.navigate(['/home-component']);
    } else {
      this.router.navigate(['/stats-component']);
    }

  }
  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user != null && this.user.userName != null) {
      this.username = this.user.userName;
    }
  }

  NavBar() {
    this.opened = !this.opened;
  }

  help() {
    this.router.navigate(['/help-component']);
    this.NavBar();
  }

  search() {
    this.router.navigate(['/searchingModule-component']);
    this.NavBar();
  }

  settings() {
    this.router.navigate(['/settings-component']);
    this.NavBar();
  }

  login() {
    const rslt = this.auth.loggedIn();
    return rslt;
  }

  stats() {
    this.router.navigate(['/stats-component']);
    this.NavBar();
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/home-component']);
    this.NavBar();
  }

  create() {
    this.router.navigate(['/create-learning-set-component']);
    this.NavBar();
  }


}
