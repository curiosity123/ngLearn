import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from 'src/models/User';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {


  dialog: MatDialogRef<LoginComponent>;
  constructor(private authservice: AuthService, dialogRef: MatDialogRef<LoginComponent>) {
    this.dialog = dialogRef;
  }
  loginCorrect = false;

  ngOnInit() {
  }


  Login(login, pass) {

    const user = { UserName: login, Password: pass } as User;

    this.authservice.login(user).subscribe(next => {
      this.dialog.close();
      this.loginCorrect = false;

    }, error => {
      this.loginCorrect = true;
    });

  }
}