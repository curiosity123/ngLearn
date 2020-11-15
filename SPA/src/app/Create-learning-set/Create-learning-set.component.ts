import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../ConfirmDialog/ConfirmDialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Console } from 'console';
import { ContentService } from 'src/services/content.service';
import { Course } from 'src/models/Course';
import { DialogData } from 'src/models/DialogData';


@Component({
  selector: 'app-Create-learning-set',
  templateUrl: './Create-learning-set.component.html',
  styleUrls: ['./Create-learning-set.component.css']
})
export class CreateLearningSetComponent implements OnInit {

  Courses: Course[];
  step = 0;
  data: DialogData = { title: 'Do you want to remove course?', confirmed: false };
  newCourse: Course = { id: 0, name: 'Course name', author: '', description: 'course description' };


  constructor(private router: Router,
              private http: HttpClient,
              private route: ActivatedRoute,
              private contentService: ContentService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.GetUserCoursesCollection();

  }




  setStep(index: number) {
    this.step = index;
  }

  GetUserCoursesCollection() {
    this.contentService.GetUserCourses().subscribe((response: Course[]) => {
      this.Courses = response;
    });
  }

  OpenEditor(courseId: number) {
    this.router.navigate(['/Items-editor', courseId]);
  }

  UpdateCourseInfo(course: Course) {

    this.contentService.ModifyCourseDetails(course.id, course.name, course.description)
      .subscribe(response => { this.GetUserCoursesCollection(); });
  }

  openDialog(courseId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Do you want to remove course?'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        this.contentService.RemoveCourse(courseId).subscribe(response => { this.GetUserCoursesCollection(); });
      }
    });
  }


  Create() {
    this.contentService.CreateCourse(this.newCourse).subscribe(response => {
      console.log(response);
      this.GetUserCoursesCollection();
    });
  }


}
