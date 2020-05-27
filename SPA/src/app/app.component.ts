import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './auth.service';
import { User } from 'src/models/User';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SPA';

  auth: AuthService;
  user: User;
  constructor(auth: AuthService) {
    this.auth = auth;
    this.user = JSON.parse(localStorage.getItem('user'));

  }


}
