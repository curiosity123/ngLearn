import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CoursesCollection as CoursessCollection, CoursesCollection } from 'src/models/CoursesCollection';
import { ContentService } from '../content.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../ConfirmDialog/ConfirmDialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/models/DialogData';
import { Console } from 'console';


@Component({
  selector: 'app-Create-learning-set',
  templateUrl: './Create-learning-set.component.html',
  styleUrls: ['./Create-learning-set.component.css']
})
export class CreateLearningSetComponent implements OnInit {

  CoursesCollection: CoursessCollection[];
  step = 0;
  data: DialogData = { title: "Do you want to remove course?", confirmed: false };
  newCourse: CoursesCollection = { id: 0, name: "Course name", description: "course description" };


  constructor(private router: Router, private _formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private contentService: ContentService, public dialog: MatDialog) { }

  ngOnInit() {
    this.GetUserCoursesCollection();

  }




  setStep(index: number) {
    this.step = index;
  }

  GetUserCoursesCollection() {
    this.contentService.GetUserCoursesCollection().subscribe((response: CoursessCollection[]) => {
      this.CoursesCollection = response;
    });
  }

  OpenEditor(courseId: number) {
    this.router.navigate(['/Items-editor', courseId]);
  }

  openDialog(courseId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: "Do you want to remove course?"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == true) {
        this.contentService.RemoveMyCourse(courseId).subscribe(response => { this.GetUserCoursesCollection() });
      }
    });
  }


  Create() {
    this.contentService.AddNewCourse(this.newCourse).subscribe(response => {
      //this.CoursesCollection = response;
      console.log(response);
      this.GetUserCoursesCollection();
    });
  }


}
