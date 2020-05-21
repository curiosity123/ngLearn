import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../Login/Login.component';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }


  openDialog() {
    this.dialog.open(LoginComponent);
  }


  ngOnInit() {
  }

}
