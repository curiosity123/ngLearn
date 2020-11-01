import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/User';
import { CreateLearningSetComponent } from '../Create-learning-set/Create-learning-set.component';
import { LearningItem } from 'src/models/LearningItem';
import { CoursesCollection } from 'src/models/CoursesCollection';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Summary } from '@angular/compiler';
import { Progress } from 'src/models/Progress';
import { environment } from 'src/environments/environment';
import { ContentService } from '../content.service';
import { ConfirmDialogComponent } from '../ConfirmDialog/ConfirmDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CoursesCollectionWithProgress } from 'src/models/CoursesCollectionWithProgress';


@Component({
  selector: 'app-stats',
  templateUrl: './Stats.component.html',
  styleUrls: ['./Stats.component.css']
})
export class StatsComponent implements OnInit {


  CoursesList: CoursesCollectionWithProgress[];
  step = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute,
    private router: Router, private contentService: ContentService, public dialog: MatDialog) { }

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
    this.contentService.RemoveFromUsersCollection(CourseId.toString()).subscribe((
      response: string) => {
      this.GetCourses();
    });

  }

  GetCourses() {
    this.contentService.GetUsersCourses()
      .subscribe((response: CoursesCollectionWithProgress[]) => {
        this.CoursesList = response;
      })

  }


  openResetProgressDialog(setId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: "Do you want to reset your progress?"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == true) {
        this.ResetProgress(setId);
      }
    });
  }


  openDeleteCourseDialog(CourseId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: "Do you want to delete this course?"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == true) {
        this.DeleteThisCourse(CourseId);
      }
    });
  }

  ResetProgress(setId: number) {
    this.contentService.ResetCourseProgress(setId.toString()).subscribe(
      x => {
        console.log(x);
        this.GetCourses();
      },
      error => console.log(error)
    );

  }



}

