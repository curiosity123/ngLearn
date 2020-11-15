import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/User';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {


  error = false;
  loginAvailable = false;
  passwordCorrect = false;

  constructor(private authservice: AuthService, dialogRef: MatDialogRef<RegisterComponent>) {
    this.dialog = dialogRef;
  }
  dialog: MatDialogRef<RegisterComponent>;
  ngOnInit() {
  }

  register(login, pass) {

    if (this.loginAvailable && this.passwordCorrect) {
      const user = { userName: login, Password: pass } as User;

      this.authservice.register(user).subscribe(next => {
        console.log();

        const usr = { userName: login, Password: pass } as User;

        this.authservice.login(usr).subscribe(() => {
          this.dialog.close();
          window.location.reload();
        });

        this.dialog.close();

      }, error => { error = true; });
    }
  }

  checkIfPasswordCorrect(login, password) {
    if ((password as string).length > 4) {
      this.passwordCorrect = true;
    } else {
      this.passwordCorrect = false;
    }
  }

  checkIfExist(login, password) {
    if (login === '') {
      this.loginAvailable = false;
      return;
    }


    const user = { userName: login, Password: '' } as User;
    this.authservice.ifUserExist(user).subscribe(next => {
      console.log(next.valueOf());
      this.loginAvailable = next.valueOf() as boolean;

    });
  }

}
