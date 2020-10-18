import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../ConfirmDialog/ConfirmDialog.component';
import { AuthService } from '../auth.service';
import { ContentService } from '../content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/User';

@Component({
  selector: 'app-settings',
  templateUrl: './Settings.component.html',
  styleUrls: ['./Settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: User;
  repetitions = 5;
  itemsPerLesson = 5;

  constructor(private route: ActivatedRoute,
    private router: Router, public dialog: MatDialog, private contentService: ContentService, private authService: AuthService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user.repetitions);
    if (this.user != null && this.user.userName != null) {
      this.repetitions = this.user.repetitions;
      this.itemsPerLesson = this.user.itemsPerLesson;
      console.log(this.user.repetitions);
    }

  }

  formatLabel(value: number) {
      return value;
  }

  password: string;
  ngOnInit() {


  }


  removeAccount(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: "Do you want to remove your account? It will also clear your results"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        this.authService.removeAccount().subscribe(res => {
          this.authService.logout();
          this.router.navigate(['/home-component']);
        });
      }
    });
  }


  saveSettings() {
   this.contentService.SaveUserSettings(this.repetitions, this.itemsPerLesson).subscribe((response: string) => { });
  }

  changePassword() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: "Do you want to your password?"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        this.authService.changePassword(this.password).subscribe(r => {
          this.authService.logout();
          this.router.navigate(['/home-component']);
        });
      }
    });
  }
}
