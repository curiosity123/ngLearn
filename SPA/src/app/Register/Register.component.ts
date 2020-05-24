import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { AuthService } from '../auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authservice: AuthService, dialogRef: MatDialogRef<RegisterComponent>) {
    this.dialog = dialogRef;
  }
  dialog: MatDialogRef<RegisterComponent>;
  ngOnInit() {
  }
  error = false;
  loginAvailable = false;
  passwordCorrect = false;

  register(login, pass) {

    const user = { UserName: login, Password: pass } as User;

    this.authservice.register(user).subscribe(next => {
      console.log();

      const user = { UserName: login, Password: pass } as User;

      this.authservice.login(user).subscribe(next => {
        this.dialog.close(); 
      });

      this.dialog.close();

    }, error => { error = true; });
  }

  checkIfPasswordCorrect(login, password) {
    if ((password as string).length > 4) {
      this.passwordCorrect = true;
    }
    else {
      this.passwordCorrect = false;
    }
  }

  checkIfExist(login, password) {
    if (login == "") {
      this.loginAvailable = false;
      return;
    }

    const user = { UserName: login, Password: "" } as User;
    this.authservice.ifUserExist(user).subscribe(next => {
      console.log(next.valueOf());
      this.loginAvailable = next.valueOf() as boolean;

    });
  }

}
