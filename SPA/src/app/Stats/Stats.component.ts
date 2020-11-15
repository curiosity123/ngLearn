import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateLearningSetComponent } from '../Create-learning-set/Create-learning-set.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Summary } from '@angular/compiler';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent } from '../ConfirmDialog/ConfirmDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CourseWithProgress } from 'src/models/CourseWithProgress';
import { ContentService } from 'src/services/content.service';
import { AccountService } from 'src/services/account.service';



@Component({
  selector: 'app-stats',
  templateUrl: './Stats.component.html',
  styleUrls: ['./Stats.component.css']
})
export class StatsComponent implements OnInit {


  Courses: CourseWithProgress[];
  step = 0;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private contentService: ContentService,
              private accountService: AccountService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.GetCourses();
  }




  SetStep(index: number) {
    this.step = index;
  }

  RunLearningModule(set: any) {
    this.router.navigate(['/lesson-component', set.id]);
  }

  DeleteThisCourse(CourseId: number) {
    this.accountService.RemoveCourseFromUsersCollection(CourseId.toString()).subscribe((
      response: string) => {
      this.GetCourses();
    });

  }

  GetCourses() {
    this.accountService.GetUsersCourses()
      .subscribe((response: CourseWithProgress[]) => {
        this.Courses = response;
      });

  }


  openResetProgressDialog(setId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Do you want to reset your progress?'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        this.ResetProgress(setId);
      }
    });
  }


  openDeleteCourseDialog(CourseId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Do you want to delete this course?'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        this.DeleteThisCourse(CourseId);
      }
    });
  }

  ResetProgress(setId: number) {
    this.accountService.ResetCourseProgress(setId.toString()).subscribe(
      x => {
        console.log(x);
        this.GetCourses();
      },
      error => console.log(error)
    );

  }



}

