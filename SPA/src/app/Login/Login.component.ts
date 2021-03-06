import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/User';



@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit  {


  dialog: MatDialogRef<LoginComponent>;
  constructor(private authservice: AuthService, dialogRef: MatDialogRef<LoginComponent>) {
    this.dialog = dialogRef;
  }
  loginCorrect = false;

  ngOnInit() {
  }


  Login(login, pass) {
    const user = { userName: login, Password: pass } as User;

    this.authservice.login(user).subscribe(next => {
      this.dialog.close();
      this.loginCorrect = false;
      window.location.reload();

    }, error => {
      this.loginCorrect = true;
      console.log('errrr');
    });

  }
}
