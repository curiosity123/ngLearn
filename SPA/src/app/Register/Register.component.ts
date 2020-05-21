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


  Login(login, pass) {

    const user = { UserName: login, Password: pass} as User;

    this.authservice.login(user).subscribe(next => {
      console.log();
      ('you are logged in correctly');

    });
  }


}
