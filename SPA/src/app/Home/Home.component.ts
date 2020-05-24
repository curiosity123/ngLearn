import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../Login/Login.component';
import { AuthService } from '../auth.service';
import { RegisterComponent } from '../Register/Register.component';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {


  authService: AuthService;
  constructor(public dialog: MatDialog, authService: AuthService) {
    this.authService = authService;
  }


  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }
  openRegisterDialog() {
    this.dialog.open(RegisterComponent);
  }


  ngOnInit() {
  }

}
