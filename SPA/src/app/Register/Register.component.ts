import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }

  loginAvailable = false;

  register(login, pass) {

    const user = { UserName: login, Password: pass } as User;

    this.authservice.register(user).subscribe(next => {
      console.log();


    });
  }

  checkIfExist(login, password) {
    if (login=="" ) {
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
