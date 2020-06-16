import { Component, OnInit, ViewChild, Directive, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-lesson-summary',
  templateUrl: './lesson-summary.component.html',
  styleUrls: ['./lesson-summary.component.css']
})
export class LessonSummaryComponent implements OnInit {

  @ViewChild('btn_focus') firstNameElement: ElementRef;

  ngAfterViewInit(){
    this.firstNameElement.nativeElement.focus();
  }
  ngOnInit() {
    document.getElementById('button').focus();
  }

  dialog: MatDialogRef<LessonSummaryComponent>;
  constructor(dialogRef: MatDialogRef<LessonSummaryComponent>, private route: ActivatedRoute,
    private router: Router) {
    this.dialog = dialogRef;
  }
  public continue = false;



  ShowSummary() {
    this.dialog.close();
    window.location.reload();
  }
}
