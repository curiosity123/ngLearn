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

@Component({
  selector: 'app-stats',
  templateUrl: './Stats.component.html',
  styleUrls: ['./Stats.component.css']
})
export class StatsComponent implements OnInit {


  CoursesList: CoursesCollection[];
  Summaries: Array<Progress>;
  step = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute,
              private router: Router, private contentService: ContentService) { }

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
      .subscribe((response: CoursesCollection[]) => {
        this.CoursesList = response;
        this.Summaries = this.contentService.UpdateProgress(this.CoursesList);
      })
    
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

