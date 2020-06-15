import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-lesson-summary',
  templateUrl: './lesson-summary.component.html',
  styleUrls: ['./lesson-summary.component.css']
})
export class LessonSummaryComponent implements OnInit {


  ngOnInit() {
  }

  dialog: MatDialogRef<LessonSummaryComponent>;
  constructor(dialogRef: MatDialogRef<LessonSummaryComponent>) {
    this.dialog = dialogRef;
  }
  loginCorrect = false;



  ShowSummary() {

   
      this.dialog.close();
      
      window.location.reload();


  }
}
