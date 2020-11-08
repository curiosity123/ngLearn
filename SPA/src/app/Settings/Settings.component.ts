import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../ConfirmDialog/ConfirmDialog.component';
import { AuthService } from '../auth.service';
import { ContentService } from '../content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/User';
import { saveAs } from 'file-saver';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './Settings.component.html',
  styleUrls: ['./Settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: User;
  repetitions = 5;
  itemsPerLesson = 5;
  password: string;
  selectedFile: File = null;
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

  ngOnInit() {
  }

  formatLabel(value: number) {
    return value;
  }

  removeAccount(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Do you want to remove your account? It will also clear your results'
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


  Backup() {
    this.contentService.Backup().subscribe(blob => {
      saveAs(blob, 'backup.json');
    });
  }

  // Import(files) {
  //   var fileData = <File>files[0];
  //   var FileName = fileData.name;
  //   let reader = new FileReader();
  //   var selectedFile = <File>files[0];

  //   reader.onload = function (readerEvt: any) {
  //     var arrayBuffer = readerEvt.target.result.toString().split('base64,')[1];
  //     document.querySelector('#hidden_upload_item').innerHTML = arrayBuffer;
  //     this.Proceed();
  //   }.bind(this);
  //   reader.readAsDataURL(selectedFile);

  // }

  Restore() {
    console.log(this.selectedFile);

    if (this.selectedFile == null) {
      return;
    }

    const file: File = this.selectedFile;

    const formData = new FormData();
    formData.append('Backup', file);

    this.contentService.Import(formData).subscribe(r => console.log(r));
  }


  onSelectFile(fileInput: any) {
    this.selectedFile = fileInput.target.files[0] as File;
  }


  saveSettings() {
    this.contentService.SaveUserSettings(this.repetitions, this.itemsPerLesson).subscribe((response: string) => {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.user.itemsPerLesson = this.itemsPerLesson;
      this.user.repetitions = this.repetitions;
      localStorage.setItem('user', JSON.stringify(this.user));
    });
  }

  changePassword() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Do you want to your password?'
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
