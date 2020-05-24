import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from 'src/models/User';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authservice: AuthService) { }


  ngOnInit() {
  }


  Login(login, pass) {

    const user = { UserName: login, Password: pass } as User;

    this.authservice.login(user).subscribe(next => {
      console.log();
      ('you are logged in correctly');
    });
  }
}
