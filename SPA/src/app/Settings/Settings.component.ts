import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../ConfirmDialog/ConfirmDialog.component';
import { AuthService } from '../auth.service';
import { ContentService } from '../content.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './Settings.component.html',
  styleUrls: ['./Settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router, public dialog: MatDialog, private contentService: ContentService, private authService: AuthService) { }

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

  changePassword() {
    this.authService.changePassword(this.password).subscribe(r=> {
      this.authService.logout();
      this.router.navigate(['/home-component']);
    });
  }

}
